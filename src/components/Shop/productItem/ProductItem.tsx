import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
import Card from '../../UI/card/Card';
import classes from './ProductItem.module.css';

interface IProductItemProps {
  id: string;
  title: string;
  price: number;
  description: string;
}

const ProductItem = (props: IProductItemProps) => {
  const dispatch = useDispatch();
  const { id, title, price, description } = props;

  const addItemToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        description,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
