import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartSlice from './slices/cartSlice'
import filterSlice from './slices/filterSlices' 
import pizzasSlice from './slices/pizzasSlice'
export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza: pizzasSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch