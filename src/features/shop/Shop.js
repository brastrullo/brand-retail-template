import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectNewArrivals
} from '../api/dataSlice';
import { CollectionGrid } from '../collection/CollectionGrid'
import { Collection } from '../collection/Collection'

export const Shop = () => {
  const newArrivals = useSelector(selectNewArrivals);

  return (
    <>
      <h1>Shop</h1>
      <main>
        <CollectionGrid name="New Arrivals" obj={newArrivals} />
        <Collection name="Collection 1" obj={newArrivals} />
        <CollectionGrid name="Collection 2" obj={newArrivals} />
      </main>
    </>
  );
}
