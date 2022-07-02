import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Card from '../UI/card/Card';
import classes from './Cart.module.css';
import CartItem from './cartItem/CartItem';

const Cart = () => {
  const cartItem = useSelector((state: RootState) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItem.map((item) => (
          <CartItem
            key={item['id']}
            item={{
              id: item['id'],
              title: item['title'],
              quantity: item['quantity'],
              total: item['totalPrice'],
              price: item['price'],
              description: item['description'],
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;