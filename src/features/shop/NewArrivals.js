import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectNewArrivals
} from '../api/dataSlice';
import { CollectionGrid } from '../collection/CollectionGrid'

export const NewArrivals = () => {
  const newArrivals = useSelector(selectNewArrivals);

  return (
    <>
      <h1>Shop</h1>
      <main>
        <CollectionGrid name="New Arrivals" obj={newArrivals} />
      </main>
    </>
  );
}
