import React from 'react';
import { useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import styled from 'styled-components';

import HeroBanner from '../hero/Hero';
import { Collection } from '../collection/Collection'
import {
  selectNewArrivals
} from '../api/dataSlice';

const StyledHome = styled.div`
  @media (max-width: 800px) {
    margin-top: 3rem;
  }
`;

export function Home() {
  const newArrivals = useSelector(selectNewArrivals);

  return (
    <StyledHome>
      <HeroBanner />
      <main>
        <Collection name="New Arrivals" obj={newArrivals} />
      </main>
    </StyledHome>
  );
}
