import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import flag from '../../assets/canada.png';
import { CartDropdown } from '../cart/CartDropdown';
import { selectCartCount } from '../cart/cartSlice';
import { Link } from "react-router-dom";
import Dropdown from '../dropdown/DropdownWrapper';

const StyledHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
  border-bottom: 1px solid lightgrey;
  background: white;
  z-index: 9999999999999999;

  @media (max-width: 800px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .link-wrapper {
    color: #000;
    text-decoration: none;
  }

  .logo-wrapper .link-wrapper {
    display: flex;
    flex-flow: row nowrap;
    .logo {
      margin: auto;
      width: 1.75rem;
      height: 1.75rem;
      background: grey;
    }
    p {
      margin: auto;
      margin-left: .5rem;
      font-weight: bold;
    }
  }

  .dropdown-wrapper {
    display: flex;
    margin: auto;
    margin-right: 1rem;
    cursor: pointer;
    img {
      position: relative;
      margin: .5rem;
      height: 1rem;
      width: 2rem;
      max-width: 120px;
      max-height: 60px;
    }
    i {
      height: 0;
      width: 0;
      margin: auto;
      margin-left: -3px;
      transform: rotate(45deg);
      border: solid black;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 2px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-content: center;

    li {
      cursor: pointer;
      margin: auto 1rem;
      position: relative;
    }
  }
`;

export function Header() {
  const cartCount = useSelector(selectCartCount);
  const [isDropdownShown, setIsDropdownShown] =  useState(false);
  // const dropdownRef = useRef(null);
  const toggleDropdownHandler = useCallback(() => {
    setIsDropdownShown(!isDropdownShown)
    document.removeEventListener('click', toggleDropdownHandler);
  }, [isDropdownShown])

  useEffect(() => {
    if(isDropdownShown) {
      document.addEventListener('click', toggleDropdownHandler)
    }
  }, [isDropdownShown, toggleDropdownHandler])

  return (
    <StyledHeader>
      <div className={'logo-wrapper'}>
        <Link to="/" className={'link-wrapper'}>
          <div className="logo" />
          <p>BRAND</p>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/shop" className={'link-wrapper'}>Shop</Link>
        </li>
        <li>
          <Dropdown label={'Cart'} count={cartCount}>
            <CartDropdown />
          </Dropdown>
        </li>
        <div className={'dropdown-wrapper'}>
          <img src={flag} alt={'canada-locale'} />
          <i className={'.dropdown-i'} />
        </div>
      </ul>
    </StyledHeader>
  )
}