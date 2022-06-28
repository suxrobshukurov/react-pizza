import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async () => {
  const { data } = await axios.get(`https://62b07cede460b79df04704b4.mockapi.io/items`);
  return data;
});
