import React from 'react';
import styled from 'styled-components';

const StyledShop = styled.div`
  min-height: calc(100vh - 3rem);
  h1 {
    font-size: 3rem;
    margin: 1rem;
  }
  @media (max-width: 800px) {
    margin-top: 3rem;
  }
`;
export const Shop = () => {
  return (
    <StyledShop>
      <h1>Shop</h1>
      <main>
      </main>
    </StyledShop>
  );
}
