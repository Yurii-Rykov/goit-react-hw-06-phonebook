import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'store/store';
import s from './Form.module.css';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', number: '' });
  const contacts = useSelector(state => state.items);
  const dispatch = useDispatch();

  const inputValue = event => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (contacts.find(item => item.name === formData.name)) {
      alert(`${formData.name} is already in contacts`);
    } else {
      dispatch(addContact({
        name: formData.name,
        number: formData.number,

      }))
    }

    reset();
  };

  const reset = () => {
    setFormData({ name: '', number: '' });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.mainForm}>
        <label className={s.mainForm_label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={formData.name}
            onChange={inputValue}
            className={s.mainForm_input}
          />
        </label>

        <label className={s.mainForm_label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={formData.number}
            onChange={inputValue}
            className={s.mainForm_input}
          />
        </label>
        <button type="submit" className={s.mainForm_btn}>
          Add contact
        </button>
      </form>
    </>
  );
};

export default Form;

