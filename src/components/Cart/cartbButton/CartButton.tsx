import classes from './CartButton.module.css';
import { uiActions } from '../../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';

const CartButton = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  const toggleCardHandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button className={classes.button} onClick={toggleCardHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
