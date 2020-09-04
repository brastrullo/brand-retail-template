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
} from '../cart/cartSlice';
import {
  updateCountObj,
  fetchDetailsObj,
  selectCollections,
  selectDetailsObj,
  selectCountObj
} from '../api/dataSlice';

const Container = styled.div`
  display: grid;
  margin: 1rem;
  flex-flow: row wrap;
  grid-gap: 1rem;
  grid-template-columns: minmax(500px, 800px) minmax(270px, auto);
  grid-auto-rows: 4rem minmax(max-content, auto);
  grid-template-areas:
    "icontainer header"
    "icontainer ocontainer";

  @media (max-width: 800px) {
    padding-top: 1rem;
    margin-top: 3rem;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-template-areas:
    "header"
    "icontainer"
    "ocontainer";
  }
`;

const OptionsContainer = styled.div`
  grid-area: ocontainer;
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
  @media (max-width: 800px) {
    margin-bottom: 0rem;
  }
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
const ButtonWrapper = styled.div`
  position: relative;
  span {
    font-size: .7rem;
    color: darkgrey;
    position: absolute;
    bottom: .7rem;
    left: 0;
  }
    ~ button {
    margin-bottom: .5rem;
  }
`;
const Button = styled.button`
  font-size: 1rem;
  border: none;
  background: #252525;
  text-align: left;
  width: 100%;
  max-width: 15rem;
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

const CheckoutButton = styled(Button)`
    margin-top: 0;
`;

const Description = styled.div`
  margin-top: 2rem;
`;

export const Details = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailsObj = useSelector(selectDetailsObj);
  const collections = useSelector(selectCollections);
  const countObj = useSelector(selectCountObj);

  const [itemObj, setItemObj] = useState({
    name: '',
    category: '',
    longDescription: '',
    price: 0,
    options: [],
    imgList: [],
  });

  const [addedToCart, setAddedToCart] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [itemCount, setItemCount] = useState(0);

  const fetchObj = async () => {
    const awaitID = await id;
    if (awaitID) {
      dispatch(fetchDetailsObj(awaitID));
    }
  }
  const initCount = () => {
    if (!!!countObj[id]) {
      dispatch(updateCountObj({id, count: 0}))
      setItemCount(0)
    } else {
      setItemCount(countObj[id])
    }
  }

  useEffect(() => {
    dispatch(updateCountObj({id, count: itemCount}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCount])

  useEffect(() => {
    fetchObj()
    if (Object.keys(detailsObj).length !== 0) {
      setItemObj(detailsObj);
      initCount()
      setCartItem({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailsObj])

  useEffect(() => {
    console.log({countObj, itemCount})
  },[itemCount, countObj])

  const cartItemReady =
    cartItem &&
    !!cartItem.size &&
    !!cartItem.colour;

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
    if (itemCount < 9) {
      const item = {
        ...cartItem,
        price,
        quantity: 1,
        id,
        uid: shortid.generate()
      }
      setItemCount(itemCount + 1)
      setCartItem(item)
      dispatch(addItem(item));
      setAddedToCart(true)
      console.log({itemCount})
    }
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
            <OptionsContainer>
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
              <ButtonWrapper>
                <Button
                  title={!cartItemReady ? "Please select size and colour" : "Add to Cart"}
                  onClick={addToCart}
                  disabled={!cartItemReady || itemCount >= 9}
                >
                  Add to Cart ({itemCount})
                </Button>
                <span>{
                  !cartItemReady
                    ? `Please select size and colour`
                    : itemCount >= 9
                      ? 'Max quantity for this item reached'
                      : ''
                }</span>
              </ButtonWrapper>
              {
                (addedToCart && (itemCount !== 0)) &&
                <CheckoutButton>Checkout</CheckoutButton>
              }

              <Description>
                { longDescription }
              </Description>
            </OptionsContainer>
          </Container>
        <Collection name={collectionObj.name} obj={collectionObj.obj} />
        </>
      }
    </>
  );
}