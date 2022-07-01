import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/signin.module.css'

const Signin = () => {
    return (
        <>
            <Head>
                <title>Signin Page</title>
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
                    <form action="#">
                        <div className={styles.formContent}>
                            <div className={styles.loginForm}>
                            <div className={styles.title}>Sign in</div>
                            <div className={styles.inputBoxes}>
                                <div className={styles.inputBox}>
                                    <i className='fas fa-envelope'></i>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="email" type="text" placeholder='Enter your email' required />
                                </div>
                                <div className={styles.inputBox}>
                                    <i className='fas fa-lock'></i>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="password" type="password" placeholder='Enter your password' required />
                                </div>
                                <div className={styles.text}>
                                    <p className='text-center mt-2'>Forgot Password? <button className='btn btn-link '>Reset Password</button></p>
                                </div>
                                <div className={`${styles.button} ${styles.inputBox}`}>
                                    <input type="submit" value="Submit" />
                                </div>
                                <div className={`${styles.text} ${styles.signupText}`}>Don't have an account? <Link href="/signup">
                                <label>Signup now</label>
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

export default Signin;