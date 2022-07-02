import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type StateType = {
  items: {
    id: string;
    title: string;
    price: number;
    description: string;
    quantity: number;
    totalPrice: number;
  }[];
  totalQuantity: number;
  isChangedCart?: boolean;
};

export type DispatchType = {
  status: string;
  title: string;
  message: string;
};

type ItemType = {
  id: string;
  title: string;
  price: number;
  description: string;
  quantity?: number;
  totalPrice?: number;
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    items: [],
    totalQuantity: 0,
    isChangedCart: false, // send request when isChangeCart true
  },
  reducers: {
    addItemToCart: (state: StateType, action: PayloadAction<ItemType>) => {
      state.totalQuantity++;
      state.isChangedCart = true;
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item: ItemType) => item.id === newItem.id
      );

      if (!existingItem) {
        // add items to array
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          description: newItem.description,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.totalPrice += newItem.price;
        existingItem.quantity++;
      }
    },

    removeItemFromCart: (state: StateType, action: PayloadAction<string>) => {
      state.totalQuantity--;
      state.isChangedCart = true;
      const id = action.payload;
      const existingItem = state.items.find((item: ItemType) => item.id === id);

      if (existingItem?.quantity === 1) {
        // remove item form array
        state.items = state.items.filter((item: ItemType) => item.id !== id);
      } else {
        existingItem!.quantity--;
        existingItem!.totalPrice -= existingItem!.price;
      }
    },

    replaceCart: (state: StateType, action: PayloadAction<StateType>) => {
      // fetch data and store
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
