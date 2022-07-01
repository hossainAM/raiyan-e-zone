import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import data from '../utils/data';

const Home = () => {
  return (
    <>
      <Layout title="Home Page">
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4'>
          {
            data.products.map((product) => (<ProductItem key={product.id} product={product}></ProductItem>))
          }
        </div>
      </Layout>
    </>
  );
};

export default Home;