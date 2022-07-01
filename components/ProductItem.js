import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductItem = ({product}) => {
    const handleAddToCart = () => {
        
    }
    return (
        <div className="card">
        <Link href={`/product/${product.id}`}>
            <a>
                <Image 
                    src={product.img}
                    alt={product.name}
                    width = "500"
                    height = "300"
                    className="rounded shadow"
                />
            </a>
        </Link>
        <div className="flex flex-col items-center justify-center p-5">
            <Link href={`/product/${product.id}`}>
            <a>
                <h2 className="text-lg">{product.name}</h2>
            </a>
            </Link>
            <p className="mb-2">{product.category}</p>
            <p>${product.price}</p>
           <button onClick={() => handleAddToCart(product)}
                className='btn btn-text secondary-button mt-3'><FontAwesomeIcon className='mr-2' icon={faShoppingCart}></FontAwesomeIcon>
                Add to Cart  
            </button>
        </div>
    </div>
  );
};

export default ProductItem;