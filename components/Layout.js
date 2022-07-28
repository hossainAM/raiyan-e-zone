import Head from 'next/head';
import NavBar from './NavBar';
import { Toaster } from 'react-hot-toast';

const Layout = ({title, children}) => {

    return (
        <>
           <Head>
                <title>{title ? title + ' - Raiyan E-Zone' : 'Raiyan E-Zone'}</title>
                <meta name="description" content="E-commerce Website"/>
                <meta name="author" content="Amir Hossain"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>

            <Toaster/>

            <div className='flex min-h-screen flex-col justify-between'>
                <NavBar></NavBar>
                <main className='container m-auto mt-4 px-6'>
                    {children}
                </main>
                <footer className='flex h-12 justify-center items-center shadow-inner'>
                    <p> Copyright &copy; 2022 Raiyan E-Zone</p>
                </footer>  
            </div>
        </>
    );
};

export default Layout;

//  <header>
//     <nav className="flex h-12 items-center px-4 justify-between shadow-md">
//         <Link href="/">
//             <a className="text-lg font-bold">amazona</a>
//         </Link>
//         <div>
//             <Link href="/cart">
//             <a className="p-2">
//                 Cart
//                 {cart.cartItems.length > 0 && (
//                 <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
//                     {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
//                 </span>
//                 )}
//             </a>
//             </Link>
//                 <Link href="/login">
//                 <a className="p-2">Login</a>
//             </Link>
//         </div>
//     </nav>
// </header>