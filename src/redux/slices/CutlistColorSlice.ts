// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// // Define the state type
// interface CutlistState {
//     cutno: string;
//     status: string;
// }

// // Initial state
// const initialState: CutlistState = {
//   cutlists:CutlistState [],
// };

// // Create slice
// const CutlistSlice = createSlice({
//   name: 'Cutlist',
//   initialState,
//   reducers: {
//     setCutList: (
//       state,
//       action: PayloadAction<{cutno: string; status: string}[]>,
//     ) => {
//       state.cutlists = action.payload; // Replace entire list
//     },
//     addCutList: (
//       state,
//       action: PayloadAction<{cutno: string; status: string}>,
//     ) => {
//       state.cutlists.push(action.payload); // Add single item
//     },
//   },
// });

// // Export actions and reducer
// export const {setCutList, addCutList} = CutlistSlice.actions;
// export default CutlistSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the state type
interface Cutlist {
  cutno: string;
  status: string;
}

interface CutlistState {
  cutlists: Cutlist[];
}

// Initial state
const initialState: CutlistState = {
  cutlists: [],
};

// Create slice
const cutlistSlice = createSlice({
  name: 'cutlist',
  initialState,
  reducers: {
    setCutList: (state, action: PayloadAction<Cutlist[]>) => {
      state.cutlists = action.payload; // Replace entire list
    },
    addCutList: (state, action: PayloadAction<Cutlist>) => {
      state.cutlists.push(action.payload); // Add single item
    },
  },
});

// Export actions and reducer
export const {setCutList, addCutList} = cutlistSlice.actions;
export default cutlistSlice.reducer;
