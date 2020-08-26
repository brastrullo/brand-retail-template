import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from "react-router-dom";
import styled from 'styled-components';

import HeroBanner from '../hero/Hero';
import Collection from '../collection/Collection'

import data from '../../mockInventory.json';

const StyledHome = styled.div`
`;

export function Home() {
  // const dispatch = useDispatch();
  // const getInventoryData = () => data.inventory
  // const getItemObj = (refId) => getInventoryData().find(item => item.refId.toString() === refId.toString());

  const obj = {items: data.inventory, photos: data.unsplash}
  
  return (
    <StyledHome>
      <HeroBanner />
      <main>
        <Collection obj={obj} />
      </main>
    </StyledHome>
  );
}
