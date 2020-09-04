import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const size = 400;
const ItemContainer = styled(Link)`
  text-decoration: none;
  margin: 0 .5rem 2rem 0;
  display: inline-grid;
  width: ${size};
  grid-template-columns: auto auto auto 3rem;
  grid-template-rows: repeat(3, min-content);
  color: black;
  
  p {
    margin: 0;
  }
`;

const Image = styled.img`
  grid-area: 1/1/auto/last;
  width: ${size};
  height: ${size};
`;
const Title = styled.p`
  grid-area: 2/1/2/span 3;
`;

const Description = styled.p`
  grid-area: 3/1/3/ span 3;
  color: #6D6D6D;
`;

const Price = styled.p`
  justify-self: center;
  grid-area: 2/5/2/span 1;
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
  const imgUrl = `https://source.unsplash.com/${id}/${size}x${size}`;
  
  return (
    <ItemContainer to={`/details/${id}`} >
      <Image src={imgUrl} alt={'placeholder'} />
      <Title>{ name }</Title>
      <Description>{ description }</Description>
      <Price>${ price }</Price>
    </ItemContainer>
  );
}

export default CollectionItem;