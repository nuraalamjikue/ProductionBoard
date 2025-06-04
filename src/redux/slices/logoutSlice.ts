import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingData {
  setCompany: any;
  setFloorID: any;
  setFloorName: any;
  setLineName: any;
  setLineID: any;
}

interface SettingState {
  settingData: SettingData | null;
}

const initialState: SettingState = {
  settingData: null,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logout: state => {
      state.settingData = null;
      AsyncStorage.clear(); // clears persisted storage on logout
    },
  },
});

export const {logout} = logoutSlice.actions;
export default logoutSlice.reducer;
