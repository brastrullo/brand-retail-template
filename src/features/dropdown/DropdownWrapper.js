import React from 'react';
import styled from 'styled-components';
import useDropdown from './useDropdown';
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
`;

const Button = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 3rem;
  justify-items: center;
  align-items: center;
  padding: 0 1rem;
  span {
    margin-right: .1rem;
  }
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

const Dropdown = styled.div`
  position: absolute;
  top: 3rem;
  right: 0rem;
  display: flex;
  padding: 1rem;
  flex-flow: column nowrap;
  background: rgba(255, 255, 255);
  border: 1px solid lightgray;
  border-top: none;
  width: 20rem;
  z-index: 999;
`;
const DropdownWrapper = (props) => {
  const history = useHistory();
  const { count, label, children, route } = props;
  const { isDropdownShown, dropdownHandler } = useDropdown();

  const goToRoute = () => {
    if (route) {
      history.push(route)
    }
  }
  
  return (
    <Wrapper
      onClick={goToRoute}
      onMouseEnter={dropdownHandler}
      onMouseLeave={dropdownHandler}
    >
      <Button>
        <span>{ label}</span>
        { count !== 'undefined' &&
          <Indicator><i>{count}</i></Indicator>
        }
      </Button>
      { isDropdownShown &&
        <Dropdown>
          { children }
        </Dropdown>
      }
    </Wrapper>
  )
}

export default DropdownWrapper;