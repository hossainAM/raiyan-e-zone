import { signOut, useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Store } from '../utils/Store';
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

const NavBar = () => {

    const { status, data: session } = useSession(); //status ia flag that when we load the session we don't show the user name

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

    const handleLogout = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/signin' });
    };
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
                        {status === 'loading' 
                        ? ('Loading') 
                        : session?.user 
                        ? 
                        <Menu as="div" className="relative inline-block">
                            <Menu.Button className="text-blue-600">
                                {session?.user?.name}
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                                <Menu.Item>
                                    <DropdownLink className="dropdown-link" href="/profile">Profile</DropdownLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <DropdownLink className="dropdown-link" href="/order-history">Order History</DropdownLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <DropdownLink className="dropdown-link" href="#" onClick={handleLogout}>Logout</DropdownLink>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu> 
                        : (
                             <Link href="/signin"><a className={isActive('/signin')}> <i className="fas fa-user -mr-2"></i>Sign in</a></Link>
                        )}
                    </li>
                </ul>
            </div>
          </div>
        </>
    );
};

export default NavBar;

