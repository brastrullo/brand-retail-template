import React from 'react';
import styled from 'styled-components';
const StyledBanner = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60vh;
  min-height: 25rem;
  font-size: 3rem;
  display: flex;
  background: #D9D9D9;
  justify-content: center;
  align-items: center;

  h1 {
    margin: auto;
    font-size: 6rem;
  }
`;

export const HeroBanner = () => {
  return (
    <StyledBanner>
      <h1>BRAND PROMO</h1>
    </StyledBanner>
  );
}

export default HeroBanner;