import { createReducer } from "@reduxjs/toolkit";
import { addContact, delet, filter } from "./action";
import initialContacts from '../json/data.json';

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

export default contactReduce;