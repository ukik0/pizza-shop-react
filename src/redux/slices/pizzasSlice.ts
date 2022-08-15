import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface pizzaSliceState {
  items: [];
  status: 'loading' | 'succes' | 'error';
}

enum Status {
  LOADING ='loading',
  SUCCES = 'succes',
  ERROR = 'error'
}

type FetchPizzas = {
  order: string;
  sortBy: string;
  categoryItem: number;
  currnetPage: number

};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params: FetchPizzas) => {
  const { order, sortBy, categoryItem, currnetPage } = params;
  const { data } = await axios.get(
    `https://62f3af16a84d8c96812980f8.mockapi.io/pizzas?page=${currnetPage}&limit=4&${
      categoryItem > 0
        ? `category=${categoryItem}&sortBy=${sortBy}&order=${order}`
        : `sortBy=${sortBy}&order=${order}`
    }
    `,
  );
  return data;
});

const pizzasSlice = createSlice({
  name: 'pizzas',
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  initialState: <pizzaSliceState>{
    items: [],
    status: Status.LOADING,
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<[]>) => {
      state.items = action.payload;
      state.status = Status.SUCCES;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
