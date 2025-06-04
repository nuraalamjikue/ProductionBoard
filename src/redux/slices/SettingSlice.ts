import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the state types
interface SettingData {
  setCompanyName: any;
  setCompanyID: any;
  setFloorID: any;
  setFloorName: any;
  setLineName: any;
  setLineID: any;
}

interface SettingStyleData {
  setstyle: any;
}

interface SettingTargetData {
  setTraget: any;
}

interface LocalSetDRData {
  DR: any;
}

// Combined state type
interface SettingState {
  settingData: SettingData | null;
  settingStyleData: SettingStyleData | null;
  SettingTargetData: SettingTargetData | null;
  LocalSetDRData: LocalSetDRData | null;
}

// Initial state
const initialState: SettingState = {
  settingData: null,
  settingStyleData: null,
  SettingTargetData: null,
  LocalSetDRData: null,
};

// Create slice
const SettingSlice = createSlice({
  name: 'Setting',
  initialState,
  reducers: {
    setSettingData: (state, action: PayloadAction<SettingData | null>) => {
      state.settingData = action.payload;
    },
    setStyleData: (state, action: PayloadAction<SettingStyleData | null>) => {
      state.settingStyleData = action.payload;
    },

    setTodayTarget: (
      state,
      action: PayloadAction<SettingTargetData | null>,
    ) => {
      state.SettingTargetData = action.payload;
    },

    SetLocalDR: (state, action: PayloadAction<LocalSetDRData | null>) => {
      state.LocalSetDRData = action.payload;
    },
  },
});

// Export actions and reducer
export const {setSettingData, setStyleData, setTodayTarget, SetLocalDR} =
  SettingSlice.actions;
export default SettingSlice.reducer;
