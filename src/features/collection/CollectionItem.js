import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const size = isMobile ? '100vw - 2rem' : '400px';
const ItemContainer = styled(Link)`
  text-decoration: none;
  margin: 0 .5rem 2rem 0;
  display: inline-grid;
  width: calc(${size});
  max-width: 400px;
  grid-template-columns: auto auto auto 3rem;
  grid-template-rows: repeat(3, min-content);
  color: black;
  
  p {
    margin: 0;
  }
`;

const Image = styled.img`
  grid-area: 1/1/auto/last;
  width: calc(${size});
  height: calc(${size});
  max-width: 400px;
  max-height: 400px;

  ${ItemContainer}:hover & {
    filter: saturate(1.1);
  }
`;
const Title = styled.p`
  grid-area: 2/1/2/span 3;
`;

const Description = styled.p`
  grid-area: 3/1/3/ span 3;
  color: #6D6D6D;
`;

const Price = styled.p`
  justify-self: end;
  padding-right: 1rem;
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
  const imgUrl = `https://source.unsplash.com/${id}/400x400`;
  
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