import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: {
    employeeCode: string;
    employeeName: string;
    userID: number;
    token: string;
    adloginid: string;
  } | null;

  floortype: {
    FloorId: number;
  } | null;

  starttimetype: {
    starttime: string;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  starttimetype: null,
  floortype: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        employeeCode: string;
        employeeName: string;
        userID: number;
        token: string;
        adloginid: string;
      }>,
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: () => initialState,

    setFlooID: (
      state,
      action: PayloadAction<{
        FloorId: number;
      }>,
    ) => {
      state.floortype = action.payload;
    },

    getStartTime: (
      state,
      action: PayloadAction<{
        starttime: string;
      }>,
    ) => {
      state.starttimetype = action.payload;
    },
  },
});

export const {login, logout, getStartTime, setFlooID} = authSlice.actions;

export default authSlice.reducer;
