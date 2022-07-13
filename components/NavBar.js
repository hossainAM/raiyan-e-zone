import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Store } from '../utils/Store';

const NavBar = () => {
    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])

    const router = useRouter();
    const isActive = (r) => {
        if(r === router.pathname){
            return 'active'
        }else {
            return ''
        }
    }
    return (
        <>
          <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            <div className="flex-1">
                <Link href='/'><a className="btn btn-ghost normal-case text-xl">RAIYAN E-ZONE</a></Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <Link href="/cart"><a className={isActive('/cart')}> <i className="fas fa-shopping-cart -mr-2"></i>Cart
                        {cartItemsCount > 0 && (
                            <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                {cartItemsCount}
                            </span>
                        )}
                        </a></Link>
                    </li>
                    <li>
                        <Link href="/signin"><a className={isActive('/signin')}> <i className="fas fa-user -mr-2"></i>Sign in</a></Link>
                    </li>
                </ul>
            </div>
          </div>
        </>
    );
};

export default NavBar;

