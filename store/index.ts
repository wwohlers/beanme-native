import { createStore } from "redux";
import reducer from "./state";
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'persistedReducer',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor }
