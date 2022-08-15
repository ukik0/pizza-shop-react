import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type sortType = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price' | any ;
};

interface filterSliceState {
  searchValue: string;
  pageCount: number;
  categoryId: number;
  sort: sortType;
  categoryItem: number;
  currnetPage: number;
}

const filterSlice = createSlice({
  name: 'filters',
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  initialState:<filterSliceState> {
    searchValue: '',
    pageCount: 1,
    categoryId: 0,
    sort: {
      name: 'популярности(DESC)',
      sortProperty: 'rating',
    },
  },
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<sortType>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setParams(state, action: PayloadAction<filterSliceState>) {
      state.sort = action.payload.sort;
      state.pageCount = Number(action.payload.currnetPage);
      state.categoryId = Number(action.payload.categoryItem);
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setParams, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
