import { useState } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import initialContacts from '../json/data.json';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || initialContacts
  );

  const [filter, setFilter] = useState('');

  const addContact = data => {
    const newContact = { id: nanoid(), ...data };

    if (contacts.find(e => e.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      const updatedContacts = [newContact, ...contacts];
      setContacts(updatedContacts);

      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return (
      contacts?.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      ) ?? []
    );
  };

  const deleteContact = contactId => {
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(newContacts);

    localStorage.setItem('contacts', JSON.stringify(newContacts));
  };
  
  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Form onSubmitForm={addContact} />

      <h2>Contacts</h2>
      <Filter onValue={filter} onChange={changeFilter} />
      <ContactList onContacts={visibleContacts()} onDelete={deleteContact} />
    </div>
  );
};

export default App;
