import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

interface Employee {
  imgURL: string;
  employeeId: string;
  employeeName: string;
  stopwatchStart: number;
  taggedId: number;
  selectedmasterId: number;
  selectedsetStyle: string;
}

interface EmployeeState {
  selectedEmployees: Employee[];
}

const initialState: EmployeeState = {
  selectedEmployees: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // Add new employee if not already in the list
    addEmployee: (state, action: PayloadAction<Employee>) => {
      const updatedData = state.selectedEmployees; // Assuming selectedEmployees holds the employee data
      const existingEmployee = state.selectedEmployees.find(
        employee =>
          employee.employeeId === action.payload.employeeId &&
          employee.selectedsetStyle === action.payload.selectedsetStyle,
      );

      if (existingEmployee) {
        return; //
      }

      // Filter employees that match employeeId and have a different selectedsetStyle
      const filteredEmployees = updatedData.filter(
        employee =>
          employee.employeeId === action.payload.employeeId &&
          employee.selectedsetStyle !== action.payload.selectedsetStyle,
      );

      //   console.log(
      //     'action.payload.selectedsetStyle   ---------------' +
      //       action.payload.selectedsetStyle,
      //   );

      //   console.log(
      //     'action.payload.employeeId   ---------------' +
      //       action.payload.employeeId,
      //   );

      //   console.log(
      //     'filteredEmployees   ---------------' +
      //       JSON.stringify(filteredEmployees, null, 2),
      //   );

      // If we found a match, remove the matched employee
      if (filteredEmployees.length > 0) {
        Alert.alert(
          `Employee with ID ${action.payload.employeeId} already exists with a different style!`,
        );

        // Remove the matched employee from selectedEmployees
        state.selectedEmployees = state.selectedEmployees.filter(
          employee =>
            !(
              employee.employeeId === action.payload.employeeId &&
              employee.selectedsetStyle !== action.payload.selectedsetStyle
            ),
        );

        state.selectedEmployees.push(action.payload);
      } else {
        state.selectedEmployees.push(action.payload);
      }

      // After removal, push the new employee into the state
    },

    // Remove an employee by employeeId
    removeEmployee: (state, action: PayloadAction<string>) => {
      state.selectedEmployees = state.selectedEmployees.filter(
        employee => employee.employeeId !== action.payload,
      );
    },

    // Replace an employee by employeeId
    replaceEmployee: (state, action: PayloadAction<Employee>) => {
      state.selectedEmployees = state.selectedEmployees.map(employee =>
        employee.employeeId === action.payload.employeeId
          ? action.payload
          : employee,
      );
    },

    // Replace an employee by employeeId and selectedsetStyle (grouping style-based)
    replaceEmployeeStyle: (state, action: PayloadAction<Employee>) => {
      const existingEmployeeIndex = state.selectedEmployees.findIndex(
        employee =>
          employee.employeeId === action.payload.employeeId &&
          employee.selectedsetStyle === action.payload.selectedsetStyle,
      );

      if (existingEmployeeIndex !== -1) {
        // Replace the existing employee data with the new data
        state.selectedEmployees[existingEmployeeIndex] = action.payload;
      } else {
        // If no existing employee is found, add the new employee to the list
        state.selectedEmployees.push(action.payload);
      }
    },
  },
});

export const {
  addEmployee,
  removeEmployee,
  replaceEmployee,
  replaceEmployeeStyle,
} = employeeSlice.actions;

export default employeeSlice.reducer;
