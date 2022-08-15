import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartLocStor } from '../../utils/getCartLocStor';


type cartItems = {
    id: string;
    count: number;
}

interface cartSliceState {
    cartItems: cartItems[]
}

const cartSlice = createSlice({
  name: 'cart',
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  initialState:<cartSliceState> {
    cartItems: getCartLocStor()
  },
  reducers: {
    setCartItem(state,action: PayloadAction<cartItems>) {
        const findItem = state.cartItems.find((item) => item.id === action.payload.id)

        if (findItem) {
            findItem.count++
        } else {
            state.cartItems.push({
                ...action.payload,
                count: 1
            })
        }
    },
    removeCartItem(state,action: PayloadAction<cartItems>) {
        const findItem = state.cartItems.find((item) => item.id === action.payload.id)

        if (findItem) {
            findItem.count--
            
        } 
    },
    deleteCartItem(state,action: PayloadAction<string>) {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
    },
    clearCartItem(state) {
        state.cartItems = []
    }
  },
});


export const { setCartItem,deleteCartItem,clearCartItem,removeCartItem  } = cartSlice.actions;
export default cartSlice.reducer;
