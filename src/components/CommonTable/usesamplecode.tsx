import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {instance} from '../../Axiosinstance';
import CommonTable from '../../components/CommonTable/CommonTable';

const CuttingTableWiseEmployeeSet = () => {
  const [loading, setLoading] = useState(false);
  const [alldata, setAllData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalItems, setTotalItems] = useState(0); // Total number of items from the API
  const itemsPerPage = 5; // Number of items per page

  // Fetch data with pagination
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await instance.get(
        `/commonController/getEmployeetablewisesetdata/${
          new Date().toISOString().split('T')[0]
        }/${page}/${itemsPerPage}`,
      );
      setAllData(response.data); // Assuming the response contains items for the page
      console.log(
        'Fetching data' + JSON.stringify(response.data[0].TotalRows, null, 2),
      );

      setTotalItems(response.data[0].TotalRows);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  // Handle data deletion
  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await instance.delete(
        `/commonController/DeleteEmployeetablewiseTagdata/${id}`,
      );
      setAllData(prevData => prevData.filter(item => item.Id !== id));
      Alert.alert('Data deleted successfully.');
    } catch (error) {
      console.error('Error deleting data:', error);
      Alert.alert('Failed to delete data.');
    } finally {
      setLoading(false);
    }
  };

  // Columns for the table
  const columns = [
    {key: 'Company', label: 'Company'},
    {key: 'Floor', label: 'Floor'},
    {key: 'Employees', label: 'Employees'},
    {key: 'Create_date', label: 'Date'},
    {key: 'action', label: 'Action'},
  ];

  // Effect to fetch data on page change
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <View style={{flex: 1}}>
      {/* Spinner for loading state */}
      <Spinner
        visible={loading}
        textContent="Loading..."
        textStyle={{color: '#fff'}}
      />
      {alldata.length > 0 ? (
        <CommonTable
          data={alldata}
          columns={columns}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <Text style={{textAlign: 'center', marginTop: 20, color: 'red'}}>
          No data found
        </Text>
      )}
    </View>
  );
};

export default CuttingTableWiseEmployeeSet;
