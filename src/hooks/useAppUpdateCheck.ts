// useAppUpdateCheck.ts
import {useEffect, useState} from 'react';
import {Alert, Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {instance} from '../Axiosinstance';

const useAppUpdateCheck = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);

  const downloadApk = async (apkUrl: string): Promise<string> => {
    try {
      const fileName = 'app-latest.apk';
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      setProgressVisible(true);
      setDownloadProgress(0);

      const {promise} = RNFS.downloadFile({
        fromUrl: apkUrl,
        toFile: downloadDest,
        background: true,
        discretionary: true,
        progress: res => {
          const percent = (res.bytesWritten / res.contentLength) * 100;
          setDownloadProgress(percent);
        },
        progressDivider: 1,
      });

      await promise;

      setProgressVisible(false);
      return downloadDest;
    } catch (error) {
      setProgressVisible(false);
      throw error;
    }
  };

  const checkForUpdate = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Get_app_versionUpdate/1`,
      );

      const {latestVersion, apkUrl, forceUpdate} = response.data.data?.[0];
      const currentVersion = DeviceInfo.getVersion();

      if (latestVersion !== currentVersion) {
        Alert.alert(
          'Update Available',
          'A new version is available. Please update the app.',
          [
            {
              text: forceUpdate ? 'Update Now' : 'Later',
              onPress: () => {
                if (forceUpdate) {
                  Linking.openURL(apkUrl);
                }
              },
            },
            {
              text: 'Update Now',
              onPress: async () => {
                try {
                  const apkPath = await downloadApk(apkUrl);
                  await FileViewer.open(apkPath, {showOpenWithDialog: true});
                } catch {
                  Alert.alert('Error', 'Failed to open the APK file.');
                }
              },
            },
          ],
          {cancelable: !forceUpdate},
        );
      }
    } catch (error: any) {
      console.error(
        'Error checking app update:',
        error.response || error.message,
      );
    }
  };

  useEffect(() => {
    checkForUpdate();

    const interval = setInterval(() => {
      checkForUpdate();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {progressVisible, downloadProgress};
};

export default useAppUpdateCheck;
