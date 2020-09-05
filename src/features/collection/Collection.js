import React from 'react';
import shortid from 'shortid';
import CollectionItem from './CollectionItem';

import styled from 'styled-components';
const Title = styled.h3`
  margin: 2rem 1rem 1rem;
  font-size: 2rem;
`;

const StyledCollection = styled.section`
  margin: 1rem;
  display: flex;
  flex-flow: row nowrap;
  overflow: scroll;
`;

const Collection = (props) => {
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

export default Collection;