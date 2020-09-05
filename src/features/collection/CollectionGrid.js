import React from 'react';
import shortid from 'shortid';
import CollectionItem from './CollectionItem';

import styled from 'styled-components';
const Title = styled.h3`
  margin: 2rem 1rem 1rem;
  font-size: 2rem;
`;

const StyledCollection = styled.section`
  margin: 1rem 1rem 3rem;
  /* max-width: calc(3 * (400px) + (2 * 1rem)); */
  /* justify-items: center; */
  justify-content: center;
  display: grid;
  gap: 1rem 1rem;
  grid-template-columns: repeat(3, minmax(150px, max-content));
  grid-auto-rows: auto ;
  overflow: hidden;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(auto, max-content));
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(1, minmax(100%, max-content));
  }
`;

export const CollectionGrid = (props) => {
  const { obj, name } = props;

  const collectionMap = (obj || []).map(item =>
    <CollectionItem key={shortid.generate()} obj={item} />
  );
  return (
    <>
      <Title>{name}</Title>
      <StyledCollection>
        { collectionMap }
      </StyledCollection>
    </>
  );
}