import ProductItem from '../productItem/ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'a book 1',
    price: 10,
    description: 'a book des 1',
  },
  {
    id: 'p2',
    title: 'a book 2',
    price: 20,
    description: 'a book des 2',
  },
  {
    id: 'p3',
    title: 'a book 3',
    price: 30,
    description: 'a book des 3',
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
