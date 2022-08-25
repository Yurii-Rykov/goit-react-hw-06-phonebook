import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delet } from '../../reduce/action'
import s from './ContactList.module.css'

const ContactList = () => {
  const contacts = useSelector(state => state.items);
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter)

  const visibleContacts = () => {
    const normalizedFilter = filter?.toLowerCase();
    return (
      contacts?.filter(contact =>
        contact?.name?.toLowerCase()?.includes(normalizedFilter)
      ) ?? []
    );
  };

  const onDelete = id => {
    dispatch(delet(id))
  }

  return (
    <ul className={s.contacts}>
      {visibleContacts().map(({ name, number, id }) => (
        <li key={id} className={s.contacts_item}>
          {name}: {number}
          <button
            type="button"
            className={s.btnDelete}
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
