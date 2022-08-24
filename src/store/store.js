import { configureStore } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import initialContacts from 'json/data.json';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { nanoid } from "nanoid";
import storage from 'redux-persist/lib/storage'


export const filter = createAction('contacts/filter'); 
export const delet = createAction('contacts/delete');
export const addContact = createAction('contacts/add', (contact) => {return {payload:{ ...contact, id: nanoid()} }});

const initial = {
    items: initialContacts,
    filter: '',
}

const contactReduce = createReducer(initial, {
    [addContact]: (state, action) => {state.items = [
    action.payload, ...state.items
    ]},
    [delet]: (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
    },
    [filter]: (state, action) => {
        state.filter = action.payload
    },
    
})

const persistConfig = { key: 'contacts', storage, blackList: ['filter', ]  }


export const store = configureStore({
    reducer: persistReducer(persistConfig, contactReduce), middleware: getDeaultMiddleware => 
    getDeaultMiddleware({serializableCheck: {ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
})

export const persistor = persistStore(store)
