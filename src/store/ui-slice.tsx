import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TypeState = {
  cartIsVisible: boolean;
  notification: {
    status: string;
    title: string;
    message: string;
  };
};

type TypeAction = {
  status: string;
  title: string;
  message: string;
};

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    cartIsVisible: false,
    notification: {
      status: '',
      title: '',
      message: '',
    },
  },
  reducers: {
    toggle: (state) => {
      state.cartIsVisible = !state.cartIsVisible;
    },

    shownotification: (state: TypeState, action: PayloadAction<TypeAction>) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
