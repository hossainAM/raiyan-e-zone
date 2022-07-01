import Head from 'next/head';
import React from 'react';
import NavBar from './NavBar';

const Layout = ({title, children}) => {
    return (
        <>
           <Head>
                <title>{title ? title + ' - Raiyan E-Zone' : 'Raiyan E-Zone'}</title>
                <meta name="description" content="E-commerce Website"/>
                <meta name="author" content="Amir Hossain"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
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