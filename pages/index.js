import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/ProductDetails';
import db from '../utils/db';

const Home = ({ products }) => {

  return (
    <>
      <Layout title="Home Page">
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4'>
          {
            products.map((product) => (<ProductItem key={product.id} product={product}></ProductItem>))
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