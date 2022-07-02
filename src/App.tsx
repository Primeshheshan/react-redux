import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/products/Products';
import Notification from './components/UI/notification/Notification';
import { RootState } from './store';
import { fetchCartData, sendCartData } from './store/cart-action';

function App() {
  const cartVisible = useSelector((state: RootState) => state.ui.cartIsVisible);
  const notification = useSelector((state: RootState) => state.ui.notification);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const isMounted = useRef(false); // current property of useRef persists throughout the lifetime of component

  useEffect(() => {
    // In React 18 useEffect runs twice instantly (mount, unmount, remount)

    if (cart.isChangedCart) {
      dispatch(sendCartData(cart) as any);
    }
  }, [cart, dispatch]);

  //fetching data
  useEffect(() => {
    if (isMounted.current) {
      dispatch(fetchCartData() as any);
    }

    return () => {
      isMounted.current = true;
    };
  }, [dispatch]);

  return (
    <>
      {notification.status !== '' && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
