import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { cartActions, StateType } from './cart-slice';
import { uiActions } from './ui-slice';

// Action creator
export const sendCartData = (cart: StateType) => {
  // we retrun the fucntion here
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(
      uiActions.shownotification({
        status: 'pending',
        title: 'Sending ...',
        message: 'Sending cart data to backend',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://cart-3cd1a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data is failed.');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.shownotification({
          status: 'success',
          title: 'Success!',
          message: 'Successfully sent data!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.shownotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data is failed.',
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://cart-3cd1a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch data!');
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [], // never endup eith undefined
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.shownotification({
          status: 'error',
          title: 'Error!',
          message: 'Could not fetch data!',
        })
      );
    }
  };
};
