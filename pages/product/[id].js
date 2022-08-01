import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import Product from "../../models/ProductDetails";
import db from "../../utils/db";
import { Store } from "../../utils/Store";

const ProductDetails = (props) => {
    const { product } = props;
    const {state, dispatch} = useContext(Store);
    const router = useRouter();
   
    if(!product){
        return <Layout title="Product Not found">Product Not found</Layout>
    }

    const handleAddToCart = async () => {
        const existItem = state.cart.cartItems.find((item) => item.id === product.id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        //here we need to fetch data from back end api to check above quantity is in stock;

        const { data } = await axios.get(`/api/products/${product._id}`);
        
        if(data.stock < quantity) {
            toast.error('Sorry. Product is out of stock');
            return;
        }

        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity }});
        router.push('/cart');
    };

    return (
        <Layout title={product.name}>
            <div className="py-2">
                <Link href="/">Back to Products</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image
                        src={product.img}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout="responsive"
                    />
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Seller: {product.seller}</li>
                        <li>Rating: {product.ratings}</li>
                        <li>Rating Count: {product.ratingsCount}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.stock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>
                        <button className="primary-button w-full" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </div>
              </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;

//get product from database

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;

    await db.connect();
    const product = await Product.findOne({ id }).lean();
    await db.disconnect();
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        },
    };
}