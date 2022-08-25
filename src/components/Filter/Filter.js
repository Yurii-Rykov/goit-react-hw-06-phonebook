import React from 'react';
import { useDispatch } from 'react-redux';
import { filter } from '../../reduce/action';
import s from './Filter.module.css'

const Filter = () => {

  const dispatch = useDispatch();

  const onChange = (event) => {
    dispatch(filter(event.target.value))
  }

  return (
    <label className={s.filter_label}>
      Find contacts by name
      <input className={s.filter_input} type="text" onChange={onChange} />
    </label>
  );
};

export default Filter;

