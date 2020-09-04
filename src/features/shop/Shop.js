import React from 'react';
import styled from 'styled-components';

const StyledShop = styled.div`
  min-height: calc(100vh - 4rem - 10.5rem);
  h1 {
    font-size: 3rem;
    margin: 1rem;
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
