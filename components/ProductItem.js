import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductItem = ({product}) => {
 
    return (
        <div className="card">
        <Link href={`/product/${product.id}`}>
            {/* <a> */}
                <Image 
                    src={product.img}
                    alt={product.name}
                    width = {351}
                    height = {350}
                    className='rounded shadow cursor-pointer'
                />
            {/* </a> */}
        </Link>
        <div className="flex flex-col items-center justify-center p-3">
            <Link href={`/product/${product.id}`}>
                <a>
                    <h2 className="text-lg text-center">{product.name}</h2>
                </a>
            </Link>
            <p className="mb-2">{product.category}</p>
            <p>${product.price}</p>
           <button 
                className='btn border-0 text-black primary-button mt-3'><FontAwesomeIcon className='mr-2 text-black' icon={faShoppingCart}></FontAwesomeIcon>
                Add to Cart  
            </button>
        </div>
    </div>
  );
};

export default ProductItem;