import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/signup.module.css'
import { useState } from 'react';
import valid from '../utils/valid';
import toast from 'react-hot-toast';

const Signup = () => {
    const initialState = { name: '', email: '', password: '', cf_password: '' };
    const [userData, setUserData] = useState(initialState);
    const {name, email, password, cf_password} = userData;

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errMessage = valid(name, email, password, cf_password)
        if(errMessage) toast.error(errMessage)
    }
    return (
        <>
            <Head>
                <title>Signup Page</title>
            </Head>
            <section className={styles.contentWrapper}>
                <div className={styles.formContainer}>
                    <div className={styles.containerCover}>
                        <Image src = "https://i.ibb.co/KqM0XKZ/car.jpg"
                        width = "500"
                        height = "300"
                        alt = "image"/>
                        <div className={styles.text}>
                            <span className={styles.text-1}>Ameera E-Zone</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} action="#">
                        <div className={styles.formContent}>
                            <div className={styles.loginForm}>
                            <div className={styles.title}>Sign Up</div>
                            <div className={styles.inputBoxes}>
                                <div className={styles.inputBox}>
                                    <i className='fas fa-user'></i>
                                    <input className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id="name" type="text" placeholder='
                                    Enter your name' name='name' value={name} onChange={handleChangeInput} />
                                </div>
                                <div className={styles.inputBox}>
                                    <i className='fas fa-envelope'></i>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="email" type="text" placeholder='Enter your email' name='email' value={email} onChange={handleChangeInput} />
                                </div>
                                <div className={styles.inputBox}>
                                    <i className='fas fa-lock'></i>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="password" type="password" placeholder='Enter your password' name='password' value={password} onChange={handleChangeInput} />
                                </div>
                                <div className={styles.inputBox}>
                                    <i className='fas fa-lock'></i>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="cf_password" type="password" placeholder='Confirm your password' name='cf_password' value={cf_password} onChange={handleChangeInput} />
                                </div>
                                <div className={styles.text}>
                                    <p className='text-center mt-2'>Forgot Password? <button className='btn btn-link '>Reset Password</button></p>
                                </div>
                                <div className={`${styles.button} ${styles.inputBox}`}>
                                    <input type="submit" value="Submit" />
                                </div>
                                <div className={`${styles.text} ${styles.signupText}`}>Already have an account? <Link href="/signin">
                                <label>Login now</label>
                                </Link></div>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Signup;