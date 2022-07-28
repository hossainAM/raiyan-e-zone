import Head from 'next/head'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const Signin = () => {
    //once session has its value (user) once logged in then redirect

    const { data: session } = useSession(); //we can have access the session anywhere after wrapping the app.js with SessionProvider

    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
        router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ email, password }) => {
        try {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (result.error) {
            toast.error(result.error);
        }
        } catch (err) {
        toast.error(getError(err));
        }
    };

    return (
        <>
            <Head>
                <title>Signin Page</title>
            </Head>
            <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        {...register('email', {
                        required: 'Please enter email',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                            message: 'Please enter valid email',
                        },
                        })}
                        className="w-full"
                        id="email"
                        autoFocus
                    ></input>
                    {errors.email && (
                        <div className="text-red-500">{errors.email.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                        required: 'Please enter password',
                        minLength: { value: 6, message: 'password is more than 5 chars' },
                        })}
                        className="w-full"
                        id="password"
                        autoFocus
                    ></input>
                    {errors.password && (
                        <div className="text-red-500 ">{errors.password.message}</div>
                    )}
                </div>
                <div className="mb-4 ">
                    <button className="primary-button">Login</button>
                </div>
                <div className="mb-4 ">
                    Don&apos;t have an account? &nbsp;
                    <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
                </div>
            </form>
        </>
    );
};

export default Signin;

// import Head from 'next/head'
// import Link from 'next/link'
// import Image from 'next/image'
// import styles from '../styles/signin.module.css'

// const Signin = () => {
//     return (
//         <>
//             <Head>
//                 <title>Signin Page</title>
//             </Head>
//             <section className={styles.contentWrapper}>
//                 <div className={styles.formContainer}>
//                     <div className={styles.containerCover}>
//                         <Image src = "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg"
//                         width = "500"
//                         height = "300"
//                         alt = "image"/>
//                         <div className={styles.text}>
//                             <span className={styles.text-1}>Raiyan E-Zone</span>
//                         </div>
//                     </div>
//                     <form action="#">
//                         <div className={styles.formContent}>
//                             <div className={styles.loginForm}>
//                             <div className={styles.title}>Sign in</div>
//                             <div className={styles.inputBoxes}>
//                                 <div className={styles.inputBox}>
//                                     <i className='fas fa-envelope'></i>
//                                     <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="email" type="text" placeholder='Enter your email' required />
//                                 </div>
//                                 <div className={styles.inputBox}>
//                                     <i className='fas fa-lock'></i>
//                                     <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="password" type="password" placeholder='Enter your password' required />
//                                 </div>
//                                 <div className={styles.text}>
//                                     <p className='text-center mt-2'>Forgot Password? <button className='btn btn-link '>Reset Password</button></p>
//                                 </div>
//                                 <div className={`${styles.button} ${styles.inputBox}`}>
//                                     <input type="submit" value="Submit" />
//                                 </div>
//                                 <div className={`${styles.text} ${styles.signupText}`}>Don&apos;t have an account? <Link href="/signup">
//                                 <label>Signup now</label>
//                                 </Link></div>
//                             </div>
//                         </div>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Signin;
