import { configureStore } from "@reduxjs/toolkit";
import contactReduce  from './reduce'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = { key: 'contacts', storage, blackList: ['filter']  }

export const store = configureStore({
    reducer: persistReducer(persistConfig, contactReduce), middleware: getDeaultMiddleware => 
    getDeaultMiddleware({serializableCheck: {ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
})

export const persistor = persistStore(store)
