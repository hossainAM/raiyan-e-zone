import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import { Store } from "../../utils/Store";

const ProductDetails = () => {
    const {state, dispatch} = useContext(Store);
    const router = useRouter();

    const {query} = useRouter();
    const {id} = query;
    const product = data.products.find(p => p.id === id)

    if(!product){
        return <div>Product Not found</div>
    }

    const handleAddToCart = () => {
        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity: 1}});
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