import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { currentPage, categoryId, searchValue, sort, order } = params;
  const { data } = await axios.get(
    `https://62b07cede460b79df04704b4.mockapi.io/items?page=${currentPage}&limit=4${
      categoryId > 0 ? `&category=${categoryId}` : ''
    }&search=${searchValue}&sortBy=${sort}&order=${order}`,
  );

  return data;
});
