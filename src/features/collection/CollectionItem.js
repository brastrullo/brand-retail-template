import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
// import { isMobile } from 'react-device-detect';

// const size = isMobile ? '100vw - 2rem' : '1000px';
const ItemContainer = styled(Link)`
  text-decoration: none;
  margin: 0 0 2rem;
  display: inline-grid;
  grid-template-columns: auto 3rem;
  grid-template-rows: repeat(3, min-content);
  grid-template-areas:
  "image image"
  "title price"
  "desc .";
  color: black;
  
  p {
    margin: 0;
  }
`;

const ImageWrapper = styled.div`
  grid-area: image;
  img {
  min-width: 300px;
  max-width: 1000px;
  max-height: 1000px;
    width: 100%;
    height: auto;
  }
  &:hover {
    img {
      filter: brightness(1.05);
    }
  }
`;
const Title = styled.p`
  grid-area: title;
`;

const Description = styled.p`
  grid-area: desc;
  color: #6D6D6D;
`;

const Price = styled.p`
  grid-area: price;
  justify-self: end;
  padding-right: 1rem;
  font-weight: bold;
`;

const CollectionItem = (props) => {
  const { obj } = props;
  const {
    name,
    category: description,
    id,
    price
  } = obj;
  const imgUrl = `https://source.unsplash.com/${id}/700x700`;
  
  return (
    <ItemContainer to={`/details/${id}`} >
      <ImageWrapper>
        <img src={imgUrl} alt={'placeholder'} />
      </ImageWrapper>
        
      <Title>{ name }</Title>
      <Description>{ description }</Description>
      <Price>${ price }</Price>
    </ItemContainer>
  );
}

export default CollectionItem;