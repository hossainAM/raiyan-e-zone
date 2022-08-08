import { useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/ProductDetails';
import db from '../utils/db';
import { Store } from '../utils/Store';
import axios from "axios";
import toast from "react-hot-toast";

const Home = ({ products }) => {

const { state, dispatch } = useContext(Store);
const { cart } = state;

const handleAddToCart = async (product) => {
        const existItem = cart.cartItems.find((item) => item.id === product.id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        //here we need to fetch data from back end api to check above quantity is in stock;

        const { data } = await axios.get(`/api/products/${product._id}`);
        
        if(data.stock < quantity) {
            return toast.error('Sorry. Product is out of stock');
        }

        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity }});

        toast.success('Product added to the cart');
    };

  return (
    <>
      <Layout title="Home Page">
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4'>
          {
            products.map((product) => (<ProductItem 
              key={product.id} 
              product={product} 
              handleAddToCart={handleAddToCart}></ProductItem>))
          }
        </div>
      </Layout>
    </>
  );
};

export default Home;

//fetch data from database for the component; this function runs before the above component to provide data for the component to be rendered;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}