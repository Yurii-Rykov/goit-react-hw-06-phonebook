import { createAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const filter = createAction('contacts/filter'); 
export const delet = createAction('contacts/delete');
export const addContact = createAction('contacts/add', (contact) => {return {payload:{ ...contact, id: nanoid()} }});
