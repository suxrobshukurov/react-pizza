import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import card from './slices/cardSlice';
import pizza from './slices/pizza/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter,
    card,
    pizza,
  },
});
