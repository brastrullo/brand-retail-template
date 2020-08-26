import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import data from '../../mockInventory.json';
import { useParams } from 'react-router-dom';
import shortid from 'shortid';
import { Sizes } from './Sizes';
import { Colors } from './Colors';
import Collection from '../collection/Collection';
import {
  addItemAndUpdateCount as addItem,
  selectCartCount
} from '../cart/cartSlice';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas:
    "header header header header header"
    "image image image tcontainer tcontainer"
    "image image image tcontainer tcontainer"
    "image image image tcontainer tcontainer";
`;

const TextContainer = styled.div`
  grid-area: tcontainer;
`;

const Header = styled.h3`
  grid-area: header;
`;
const Image = styled.img`
  grid-area: image;
  max-width: 400px;
  height: 400px;
`;
const Title = styled.p`
  grid-area: title;
`;
const Subtitle = styled.p`
  grid-area: subtitle;
`;
const Price = styled.p`
  grid-area: price;
`;
const PositionColors = styled(Colors)`
  grid-area: colors;
`;
const PositionSizes = styled(Sizes)`
  grid-area: sizes;
`;
const Button = styled.button`
`;

export const Details = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const cartCount = useSelector(selectCartCount);

  const getInventoryData = () => data.inventory
  const getItemObj = (id) => getInventoryData().find(item => item.id.toString() === id.toString());
  const obj = getItemObj(id);
  const { refId, name, category, options, oneLineDesc, price } = obj;

  const [cartItem, setCartItem] = useState({
    refId,
    id,
    price,
  });

  const [addedToCart, setAddedToCart] = useState(false);

  const cartItemReady =
    cartItem &&
    !!cartItem.refId &&
    !!cartItem.size &&
    !!cartItem.colour;

  useEffect(() => {
    console.log({cartItem}, cartItemReady)
  }, [cartItem, cartItemReady])
  
  const sizes = options.find(obj => obj.type === "size");
  const colours = options.find(obj => obj.type === "colour");

  const imgUrl = `https://source.unsplash.com/${id}/600x600`;

  const changeHandler = (obj) => {
    setCartItem({
      ...cartItem,
      ...obj
    })
  }

  const addToCart = () => {
    dispatch(addItem(cartItem));
    setAddedToCart(true)
  }

  const collectionObj = { items: data.inventory, photos: data.unsplash };
  return (
    <>
      <Container key={shortid}>
        <Header>Details</Header>
        <Image src={imgUrl} alt={oneLineDesc} />
        <TextContainer>
          <Title>{ name }</Title>
          <Subtitle>{ category }</Subtitle>
          <Price>{ price }</Price>
          <PositionSizes
            arr={sizes.list}
            title={sizes.type}
            objKey={sizes.type}
            changeHandler={changeHandler}
          />
          <PositionColors
            arr={colours.list}
            title={colours.type}
            objKey={colours.type}
            changeHandler={changeHandler}
          />
          <Button
            onClick={addToCart}
            disabled={!cartItemReady}
          >
            Add to Cart({cartCount})
          </Button>
          {
            addedToCart &&
            <Button disabled={cartCount === 0}>Checkout</Button>
          }
        </TextContainer>
      </Container>
      <Collection obj={collectionObj} />
    </>
  );
}