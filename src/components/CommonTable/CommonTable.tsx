import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

interface CommonTableProps {
  data: any[];
  columns: {key: string; label: string}[];
  onAction: (id: number) => Promise<void>;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  ActionIcon: string;
}

const CommonTable: React.FC<CommonTableProps> = ({
  data,
  columns,
  onAction,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  ActionIcon,
}) => {
  const [sortedData, setSortedData] = useState(data);
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const sortTable = (columnKey: string) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc';
    const sorted = _.orderBy(sortedData, [columnKey], [newDirection]);
    setSelectedColumn(columnKey);
    setDirection(newDirection);
    setSortedData(sorted);
  };

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((col, index) => (
        <TouchableOpacity
          key={index}
          style={styles.columnHeader}
          onPress={() => sortTable(col.key)}>
          <Text style={styles.columnHeaderTxt}>
            {col.label}
            {selectedColumn === col.key && (
              <Icon
                name={direction === 'desc' ? 'chevron-down' : 'chevron-up'}
                size={12}
                color="red"
              />
            )}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Table Header */}
      {renderHeader()}

      {/* Table Rows */}
      {sortedData.map((row, index) => (
        <View
          key={row.Id}
          style={[
            styles.row,
            index % 2 === 0 ? styles.evenRow : styles.oddRow,
          ]}>
          {columns.map(col => (
            <Text key={col.key} style={styles.rowText}>
              {row[col.key]}
            </Text>
          ))}

          {/* Delete Icon */}
          <View style={styles.deleteIconContainer}>
            <Icon
              name={ActionIcon}
              onPress={() => onAction(row.Id)}
              size={24}
              style={styles.deleteIcon}
            />
          </View>
        </View>
      ))}

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            currentPage <= 1 && styles.disabledButton,
          ]}
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}>
          <Text style={styles.paginationButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>
          Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
        </Text>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            currentPage >= Math.ceil(totalItems / itemsPerPage) &&
              styles.disabledButton,
          ]}
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}>
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#0078D7',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  columnHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  columnHeaderTxt: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: height * 0.012,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
    fontSize: height * 0.01,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: height * 0.01,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  paginationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: height * 0.01,
  },
  pageInfo: {
    fontSize: height * 0.01,
    alignSelf: 'center',
    paddingVertical: 10,
    color: '#000',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  deleteIconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 0.5,
  },
  deleteIcon: {
    color: 'red',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
});

export default CommonTable;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import _ from 'lodash';

// interface CommonTableProps {
//   data: any[];
//   columns: {key: string; label: string; width?: number}[];
//   onDelete: (id: number) => Promise<void>;
//   currentPage: number;
//   totalItems: number;
//   itemsPerPage: number;
//   onPageChange: (page: number) => void;
// }

// const CommonTable: React.FC<CommonTableProps> = ({
//   data,
//   columns,
//   onDelete,
//   currentPage,
//   totalItems,
//   itemsPerPage,
//   onPageChange,
// }) => {
//   const [sortedData, setSortedData] = useState(data);
//   const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
//   const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

//   useEffect(() => {
//     setSortedData(data);
//   }, [data]);

//   const sortTable = (columnKey: string) => {
//     const newDirection = direction === 'desc' ? 'asc' : 'desc';
//     const sorted = _.orderBy(sortedData, [columnKey], [newDirection]);
//     setSelectedColumn(columnKey);
//     setDirection(newDirection);
//     setSortedData(sorted);
//   };

//   const renderHeader = () => (
//     <View style={styles.tableHeader}>
//       {columns.map((col, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[styles.columnHeader, {width: col.width}]}
//           onPress={() => sortTable(col.key)}>
//           <Text style={styles.columnHeaderTxt}>
//             {col.label}
//             {selectedColumn === col.key && (
//               <Icon
//                 name={direction === 'desc' ? 'chevron-down' : 'chevron-up'}
//                 size={12}
//                 color="red"
//               />
//             )}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Table Header */}
//       {renderHeader()}

//       {/* Table Rows */}
//       {sortedData.map((row, index) => (
//         <View
//           key={row.Id}
//           style={[
//             styles.row,
//             index % 2 === 0 ? styles.evenRow : styles.oddRow,
//           ]}>
//           {columns.map(col => (
//             <Text key={col.key} style={[styles.rowText, {width: col.width}]}>
//               {row[col.key]}
//             </Text>
//           ))}

//           {/* Delete Icon */}
//           <View style={styles.deleteIconContainer}>
//             <Icon
//               name="trash-o"
//               onPress={() => onDelete(row.Id)}
//               size={24}
//               style={styles.deleteIcon}
//             />
//           </View>
//         </View>
//       ))}

//       {/* Pagination Controls */}
//       <View style={styles.paginationContainer}>
//         <TouchableOpacity
//           style={[
//             styles.paginationButton,
//             currentPage <= 1 && styles.disabledButton,
//           ]}
//           onPress={() => onPageChange(currentPage - 1)}
//           disabled={currentPage <= 1}>
//           <Text style={styles.paginationButtonText}>Previous</Text>
//         </TouchableOpacity>
//         <Text style={styles.pageInfo}>
//           Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
//         </Text>
//         <TouchableOpacity
//           style={[
//             styles.paginationButton,
//             currentPage >= Math.ceil(totalItems / itemsPerPage) &&
//               styles.disabledButton,
//           ]}
//           onPress={() => onPageChange(currentPage + 1)}
//           disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}>
//           <Text style={styles.paginationButtonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CommonTable;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#f1f1f1',
//     padding: 10,
//   },
//   columnHeader: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   columnHeaderTxt: {
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   row: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#0000',
//   },
//   rowText: {
//     flex: 1,
//     textAlign: 'left',
//     color: '#000000',
//     width: 100,
//   },
//   evenRow: {
//     backgroundColor: '#f9f9f9',
//   },
//   oddRow: {
//     backgroundColor: '#ffffff',
//   },
//   deleteIconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingLeft: 10,
//   },
//   deleteIcon: {
//     color: 'red',
//   },
//   paginationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   paginationButton: {
//     padding: 10,
//     backgroundColor: '#ddd',
//     borderRadius: 5,
//   },
//   disabledButton: {
//     backgroundColor: '#ccc',
//   },
//   paginationButtonText: {
//     fontWeight: 'bold',
//   },
//   pageInfo: {
//     fontSize: 16,
//   },
// });
