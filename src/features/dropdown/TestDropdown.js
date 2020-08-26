import React from 'react';
import Dropdown from './Dropdown';

const TestDropdown = (props) => {
  const { label, dropdownHandler } = props;
  return (
    <p onClick={dropdownHandler}>{ label }</p>
  )
}

export default Dropdown(TestDropdown);