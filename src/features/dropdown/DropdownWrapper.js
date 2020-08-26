import React from 'react';
import styled from 'styled-components';
import useDropdown from './useDropdown';

const StyledDropdown = styled.div`
  display: relative;
`;

const Indicator = styled.div`
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  border-radius: 50%;
  background: black;
  i {
    margin: auto;
    color: white;
    font-style: normal;
    font-size: .5rem;
  }
`;
const DropdownWrapper = (props) => {
  const { count, label, children } = props;
  const { isDropdownShown, dropdownHandler } = useDropdown();
  
  return (
    <StyledDropdown onClick={dropdownHandler} >
      <span>
        { label}
        { count !== 'undefined' &&
          <Indicator><i>{count}</i></Indicator>
        }
      </span>
      { isDropdownShown &&
        children
      }
    </StyledDropdown>
  )
}

export default DropdownWrapper;