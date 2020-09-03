import React from 'react';
import {
  useSelector,
  // useDispatch
} from 'react-redux';
import {
  selectItemArray,
  selectCartCount,
} from './cartSlice';
import { Link } from "react-router-dom";
import data from '../../mockInventory.json';
import styled from 'styled-components';

const StyledDropdown = styled.div`

  .dropdown-title {
    margin: 0;
  }

  .cart-list {
    display: flex;
    flex-flow: column nowrap;
    margin: 1rem 0;
  }
  .cart-item {
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    ~ .cart-item {
      margin-top: 1rem;
    }
  }

  .cart-item-img {
    height: 25%;
    width: 25%;
    ~ .details-container {
      margin-left: .5rem;
    }
  }
  p {
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .details-desc {
    width: 75%;
    color: #4D4D4D;
  }
  .specs-container {
    margin: .5rem 0 0;
    font-size: .8rem;
    color: #4D4D4D;
  }
  .spec-item-label {
    text-transform: capitalize;
  }
  .buttons-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;

    .button {
      background: black;
      color: white;
      width: calc(50% - 1rem);
      text-align: center;
      border-radius: 3rem;
      text-decoration: none;
      padding: .5rem 1rem;
      ~ .button {
        margin-left: 1rem;
      }
    }
  }
`;

export function CartDropdown() {
  const items = useSelector(selectItemArray);
  const cartCount = useSelector(selectCartCount);
  // const dispatch = useDispatch();
  const getInventoryData = () => data.inventory;
  const getItemObj = (id) => getInventoryData().find(item => item.id === id);
  
  const cartList = items.map((item, i) => {
    const imgUrl = `https://source.unsplash.com/${item.id}/80x80`;
    const { id, colour, size, quantity } = item;
    const itemObj = getItemObj(id);
    const getOptionObj = (id) => itemObj.options[1].list.find(obj => obj.id.toString() === id.toString());
    const type = itemObj.options[1].type;
    const colourName = getOptionObj(colour).label;

    return (
      <li key={`ct${i}`} className="cart-item">
        <img className="cart-item-img" src={imgUrl} alt={'placeholder'} />
        <div className="details-container">
          <p className="details-name">{itemObj.name}</p>
          <p className="details-desc">{itemObj.category}</p>
          <div className="specs-container">
            <p className="spec-item">
              <span className="spec-item-label">Quantity: </span>
              <span className="spec-item-value">{quantity}</span>
            </p>
            <p className="spec-item">
              <span className="spec-item-label">{type}: </span>
              <span className="spec-item-value">{colourName}</span>
            </p>
            <p className="spec-item">
              <span className="spec-item-label">Size: </span>
              <span className="spec-item-value">{size}</span>
            </p>
          </div>
        </div>
      </li>
    )
  })
  return (
    <StyledDropdown>
      <h3 className="dropdown-title">Cart Items</h3>
      <ul className="cart-list">
        { cartList }
      </ul>
      <div className="buttons-container">
        <Link className="button" to="/cart">View Cart ({cartCount})</Link>
        <Link className="button" to="/checkout">Checkout</Link>
      </div>
    </StyledDropdown>
  )
}