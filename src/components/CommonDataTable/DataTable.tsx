import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';

interface DataTableProps<T> {
  headers: string[];
  data: T[];
  page: number;
  totalPages: number;
  totalCount: number;
  onPrevious: () => void;
  onNext: () => void;
  renderRow: (item: T) => React.ReactNode; // Make sure it returns React.ReactNode
}

const DataTable = <T,>({
  headers,
  data,
  page,
  totalPages,
  totalCount,
  onPrevious,
  onNext,
  renderRow,
}: DataTableProps<T>) => {
  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.header}>
        {headers.map((header, index) => {
          // Conditionally apply width based on the index
          let headerWidth;
          switch (index) {
            case 0:
              headerWidth = 20;
              break;
            case 1:
              headerWidth = 150;
              break;
            case 2:
              headerWidth = 70; // Example width for the third column
              break;
            case 3:
              headerWidth = 50; // Example width for the fourth column
              break;
            case 4:
              headerWidth = 150; // Example width for the sixth column
              break;
            case 5:
              headerWidth = 80; // Example width for the sixth column
              break;
            case 6:
              headerWidth = 120; // Example width for the sixth column
              break;
          }

          return (
            <Text key={index} style={[styles.headerText, {width: headerWidth}]}>
              {header}
            </Text>
          );
        })}
      </View>

      {/* Table Data */}

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          // Ensure renderRow always returns a valid React element or null
          const renderedRow = renderRow(item);
          return renderedRow ?? null; // If it's undefined, return null
        }}
        nestedScrollEnabled
      />

      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <Button title="Previous" onPress={onPrevious} disabled={page === 1} />
        <Text>{`Page ${page} of ${totalPages} total data ${totalCount}`}</Text>
        <Button title="Next" onPress={onNext} disabled={page === totalPages} />
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 5, paddingVertical: 5},
  header: {
    flexDirection: 'row',
    backgroundColor: '#0078D7',
    paddingVertical: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: height * 0.012,
    color: 'white',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.015,
  },
  evenHeaderText: {
    color: 'blue', // Example style for even index
  },
  oddHeaderText: {
    color: 'green', // Example style for odd index
  },
});

export default DataTable;
