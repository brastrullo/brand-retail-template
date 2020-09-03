import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Sizes } from './Sizes';
import { Colors } from './Colors';
import { ImageContainer } from './ImageContainer';
import Collection from '../collection/Collection';
import {
  addItemAndUpdateCount as addItem,
  selectCartCount
} from '../cart/cartSlice';
import {
  fetchDetailsObj,
  selectCollections,
  selectDetailsObj
} from '../api/dataSlice';

const Container = styled.div`
  display: grid;
  margin: 1rem;
  flex-flow: row wrap;
  grid-gap: 1rem;
  grid-template-columns: minmax(500px, 800px) auto;
  grid-auto-rows: 4rem 1000px;
  grid-template-areas:
    "icontainer header"
    "icontainer tcontainer";

  @media (max-width: 800px) {
    grid-template-areas:
    "icontainer"
    "tcontainer";
  }
`;
const TextContainer = styled.div`
  grid-area: tcontainer;
  width: 100%;
`;

const Header = styled.div`
  display: grid;
  grid-template-areas:
  "subtitle price"
  "title title";
`;
const Title = styled.p`
  grid-area: title;
  font-size: 1.5rem;
  margin: .5rem 0 2rem;
`;
const Subtitle = styled.span`
  grid-area: subtitle;
`;
const Price = styled.span`
  grid-area: price;
  justify-self: end;
`;
const PositionColors = styled(Colors)`
  grid-area: colors;
`;
const PositionSizes = styled(Sizes)`
  grid-area: sizes;
`;
const Button = styled.button`
  font-size: 1rem;
  border: none;
  background: #252525;
  text-align: left;
  width: 100%;
  height: auto;
  color: white;
  margin: 1.5rem 0;
  padding: 1rem;
  &:hover {
    background: #363636;
  }
  &:disabled {
    background: #DFDFDF;
    color: #ADADAD;
  }
`;

const Description = styled.div``;

export const Details = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailsObj = useSelector(selectDetailsObj);
  const collections = useSelector(selectCollections);
  const cartCount = useSelector(selectCartCount);

  const fetchObj = async () => {
    const awaitID = await id;
    if (awaitID) {
      console.log({awaitID});
      dispatch(fetchDetailsObj(awaitID));
    }
  }

  const [itemObj, setItemObj] = useState({
    name: '',
    category: '',
    longDescription: '',
    price: 0,
    options: [],
    imgList: [],
  });

  useEffect(() => {
    fetchObj()
    if (Object.keys(detailsObj).length !== 0) {
      setItemObj(detailsObj);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailsObj])

  const [addedToCart, setAddedToCart] = useState(false);
  const [cartItem, setCartItem] = useState({});

  const cartItemReady =
    cartItem &&
    !!cartItem.size &&
    !!cartItem.colour;

  useEffect(() => {
    console.log({cartItem}, cartItemReady);
  }, [cartItem, cartItemReady])

  const { name, category, options, imgList, longDescription, price } = itemObj;

  const changeHandler = (obj) => {
    setCartItem({
      ...cartItem,
      ...obj
    })
  }

  const sizes = options.find(obj => obj.type === "size");
  const colours = options.find(obj => obj.type === "colour");
  const formattedPrice = `$${price.toFixed(2)}`;
  const collectionObj = {
    name: 'New Arrivals',
    obj: collections.new_arrivals
  };

  const addToCart = () => {
    const item = {
      ...cartItem,
      price,
      quantity: 1,
      id,
      uid: shortid.generate()
    }
    console.log(item)
    setCartItem(item)
    dispatch(addItem(item));
    setAddedToCart(true)
  }

  return (
    <>
      { (itemObj && itemObj.id === id) &&
        <>
          <Container key={shortid}>
            <ImageContainer main={itemObj.id} list={imgList} alt={name} />
            <Header>
              <Subtitle>{ category }</Subtitle>
              <Price>{ formattedPrice }</Price>
              <Title>{ name }</Title>
            </Header>
            <TextContainer>
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
                title={!cartItemReady ? "Please select size and colour" : "Add to Cart"}
                onClick={addToCart}
                disabled={!cartItemReady}
              >
                Add to Cart ({cartCount})
              </Button>
              {
                addedToCart &&
                <Button disabled={cartCount === 0}>Checkout</Button>
              }

              <Description>
                { longDescription }
              </Description>
            </TextContainer>
          </Container>
        <Collection name={collectionObj.name} obj={collectionObj.obj} />
        </>
      }
    </>
  );
}