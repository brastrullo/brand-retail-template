import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const ItemContainer = styled(Link)`
  text-decoration: none;
  margin: 0 .5rem 2rem 0;
  display: inline-grid;
  width: 400px;
  grid-template-columns: auto auto auto 3rem;
  grid-template-rows: repeat(3, min-content);
  color: black;
  
  p {
    margin: 0;
  }
`;

const Image = styled.img`
  grid-area: 1/1/auto/last;
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
    imgId: id,
    price
  } = obj;
  // const size = 275;
  // const randomImg = `https://source.unsplash.com/${size}x${size}?sig=${obj.i}`;
  // const urlCollection = `https://source.unsplash.com/collection/12041053/${size}x${size}?sig=${obj.i}`;
  const imgUrl = `https://source.unsplash.com/${id}/325x325`;
  
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