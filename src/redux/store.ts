import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import storage from 'redux-persist/lib/storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import { thunk } from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
})

export const persistor = persistStore(store)
