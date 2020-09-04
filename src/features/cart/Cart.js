import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  removeItemAndUpdateCount as removeItem,
  updateItemQuantityAndCount as updateItemQuantity,
  updateItemSize,
  updateItemSpec,
  selectItemArray,
  selectCartCount,
  selectSubtotal
} from './cartSlice';
import { Link } from "react-router-dom";
import data from '../../mockInventory.json';
// import styles from './Counter.module.css';

const inputBaseStyle = `
  background: none;
  border: none;
`
const StyledCart = styled.div`
  min-height: calc(100vh - 4rem - 10.5rem);

  h1 {
    margin: 1rem;
    font-size: 3rem;
  }
  main {
    width: 60rem;
    margin: 0rem auto;
    font-size: 16px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  select, button {
    cursor: pointer;
  }

  .cart-list {
    list-style: none;
    padding-left: 0;
  }
  .cart-item {
    display: flex;
    flex-flow: row wrap;
    padding-bottom: 1rem;
    margin: 1rem 0;
    max-width: 35rem;
    :not(:last-of-type) {
      border-bottom: 1px solid lightgray;
    }
  }
  .img-wrapper {
    display: flex;
    margin: 1rem;
  }

  .item-img {
    height: 5rem;
    width: 5rem;
    border: 1px solid lightgray;
    margin: auto;
  }

  .item-details {
    display: flex;
    flex-flow: column wrap;
    text-align: left;
    width: 10rem;
    margin: 1rem;
    color: #868686;
    > p {
      margin: 0;
    }
  }

  .details-name {
    color: #252525;
  }

  .item-delete {
    display: flex;
    margin: 0rem;
    
    button {
      height: 2rem;
      width: 2rem;
      margin: auto;
      ${inputBaseStyle}
    }
  }

  .price-wrapper {
    display: flex;
    flex-flow: row wrap;
    .details-quantity {
      margin: auto 1rem;
      select {
        width: 2.5rem;
        ${inputBaseStyle}
      }
    }

    .details-price {
      margin: auto 1rem;
      text-align: right;
      width: 5rem;
    }
  }

  .dropdowns-row {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: .5rem;
    color: #5D5D5D;

    select {
      background: none;
      border: none;
    }
    select#size {
      width: 2.75rem;
    }
    select#spec {
      width: 6rem;
    }
  }

  .details-dropdown {
    display: flex;
    flex-flow: column wrap;
    color: #5D5D5D;
    
    label {
      text-transform: capitalize;
      font-size: .8rem;
    }
  }
  .format-price {
    ::before {
      content: '$';
    }
  }

  .cart-summary {
    width: 20rem;
    display: flex;
    flex-flow: column nowrap;
    p {
      display: flex;
      margin: .5rem 0;
      justify-content: space-between;
      flex-flow: row nowrap;
    }
  }
  .checkout-btn {
    align-self: flex-end;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background: black;
    color: white;
    border: none;
    border-radius: 10rem;
    margin: 1rem 0;
    font-size: 1.1rem;
    font-weight: bold;
    width: 10.5rem;
    padding: .75rem;
  }
`;

export function Cart() {
  const items = useSelector(selectItemArray);
  const cartCount = useSelector(selectCartCount);
  const subtotal = useSelector(selectSubtotal);
  const dispatch = useDispatch();

  const getInventoryData = () => data.inventory
  const getItemObj = (id) => getInventoryData().find(item => item.id === id);
  const itemQuantityMap = Array.from(Array(9).keys()).map((n,i) => {
    return (
      <option
        key={`qn${i}`}
        value={n + 1}
      >
        { n + 1 }
      </option>
    )
  })

  const itemSizeMap = (id) => getItemObj(id).options[0].list.map((obj, i) => {
    return (
      <option
        key={`sz${i}`}
        value={obj.value}
        disabled={!obj.available}
      >
        { obj.value }
      </option>
    )
  })

  const itemSpecMap = id => getItemObj(id).options[1].list.map((obj, i) => {
    return (
      <option
        key={`sp${i}`}
        value={obj.id}
        disabled={!obj.available}
      >
        {obj.label}
      </option>
    )
  })

  const selectQuantityHandler = (e, uid) => {
    const quantity = e.target.value;
    dispatch(updateItemQuantity({uid, quantity}));
  }
  const selectSizeHandler = (e, uid) => {
    const size = e.target.value;
    dispatch(updateItemSize({uid, size}));
  }
  const selectSpecHandler = (e, uid) => {
    const colour = e.target.value;
    dispatch(updateItemSpec({uid, colour}));
  }
  const removeItemHandler = (uid) => {
    dispatch(removeItem(uid))
  }

  const itemsMap = items.map((item, i) => {
    const { uid, id, colour, quantity, size } = item;
    // uid is the unique id for every cart item
    // id is the inventory item id
    const itemObj = getItemObj(id);
    const imgUrl = `https://source.unsplash.com/${id}/200x200`;
    const itemPrice = (itemObj.price * quantity).toFixed(2)
    const COLOUR_LABEL = itemObj.options[1].type
    return <li key={`c${i}`} className="cart-item">
      <div className={'btn-wrapper item-delete'}>
        <button onClick={() => removeItemHandler(id)}>X</button>
      </div>
      <div className={'img-wrapper'}>
        <img className={'item-img'} src={imgUrl} alt="placeholder"/>
      </div>
      <div className={'item-details'}>
        <p className={'details-name'}>{ `${itemObj.name}` }</p>
        <p className={'details-desc'}>{ `${itemObj.category}` }</p>
        <div className={'dropdowns-row'}>
          <div className={'details-size details-dropdown'}>
            <label htmlFor={'size'}>Size: </label>
            <select
              name="size"
              id="size"
              value={size}
              onChange={(e) => selectSizeHandler(e, uid)}
            >
              { itemSizeMap(id) }
            </select>
          </div>
          <div className={'details-spec details-dropdown'}>
            <label htmlFor={'spec'}>{`${COLOUR_LABEL}: `}</label>
            <select
              name="spec"
              id="spec"
              value={colour}
              onChange={(e) => selectSpecHandler(e, uid)}
            >
              { itemSpecMap(id) }
            </select>
          </div>
        </div>
      </div>
      <div className={'price-wrapper'}>
        <div className={'details-quantity details-dropdown'}>
          <label htmlFor={'quantity'}>Qty: </label>
          <select
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => selectQuantityHandler(e, uid)}
          >
            { itemQuantityMap }
          </select>
        </div>
        <p className="details-price format-price">{itemPrice}</p>
      </div>
    </li>
  })

  const totalSummary = () => {
    const shipping = items.length > 0 ? (25).toFixed(2) : 0;
    const total = (Number(subtotal) + Number(shipping)).toFixed(2);
    return (
      <div className="cart-summary">
        <h2>Summary</h2>
        <p>Cart Count: { cartCount }</p>
        <p className="summary-subtotal">
          <span>Subtotal: </span>
          <span className={'format-price'}>{subtotal}</span>
        </p>
        { shipping > 0 &&
          <p className="summary-shipping">
            <span>Shipping and Handling: </span>
            <span className={'format-price'}>{shipping}</span>
          </p>
        }
        <p className="summary-price">
          <span>Total: </span>
          <span className={'format-price'}>{total}</span>
        </p>
        <Link className={'checkout-btn'} to="/checkout">Checkout</Link>
      </div>
    )
  }

  return (
    <StyledCart>
    <h1>Your Cart</h1>
    <main>
      <div className={'review-list'}>
        <h2>Review Items</h2>
        {
          Number(cartCount) === 0 ?
            <>
              <span>No items in your cart. </span>
              <p>
                <Link to="/shop">Proceed to Shop</Link>
              </p>
            </>
          :
            <ul className={'cart-list'}>
              { itemsMap }
            </ul>

        }
      </div>
      { totalSummary() }
    </main>
    </StyledCart>
  );
}
