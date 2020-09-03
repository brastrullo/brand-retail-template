import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Link } from "react-router-dom";
import styled from 'styled-components';

import HeroBanner from '../hero/Hero';
import Collection from '../collection/Collection'
import {
  selectCollections,
  selectNewArrivals
} from '../api/dataSlice';

const StyledHome = styled.div`
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
