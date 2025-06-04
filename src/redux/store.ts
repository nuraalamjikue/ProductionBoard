import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';
import CutlistReducer from './slices/CutlistColorSlice';
import SettingReducer from './slices/SettingSlice';
import logoutReducer from './slices/logoutSlice';

// 1. Combine all your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  cutlist: CutlistReducer,
  Setting: SettingReducer,
  logout: logoutReducer,
});

// 2. Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['cutlist'], // optionally exclude specific slices
};

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// 5. Persistor
export const persistor = persistStore(store);

// 6. Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
