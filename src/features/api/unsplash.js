import React from 'react';

const BASE_URL = `https://api.unsplash.com`
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
// const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

const headers = new Headers()
headers.append(`Authorization: Client-ID ${ACCESS_KEY}`);

export const getPhotoById = (id) => fetch(`${BASE_URL}/photos/${id}`, {
  headers
})