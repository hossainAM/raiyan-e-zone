import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

const Payment = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!selectedPaymentMethod) {
            return toast.error('Payment method is required');
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod,
            })
        );
        router.push('/placeorder');
    };
    
    useEffect(() => {
        if(!shippingAddress.address) {
            return router.push('/shipping');
        }
        setSelectedPaymentMethod(paymentMethod || '');
    }, [paymentMethod, router, shippingAddress.address]);

    return (
        <Layout title="Payment Method">
            <CheckoutWizard activeStep={2}/>
            <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit}>
                <h1 className='mb-4 text-xl'>Payment Method</h1>
                {
                    ['Paypal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                        <div key={payment} className="mb-4">
                            <input 
                                type="radio"
                                name="paymentMethod"
                                id={payment}
                                checked={selectedPaymentMethod === payment}
                                onChange={() => setSelectedPaymentMethod(payment)}
                            />

                            <label className='p-2' htmlFor={payment}>
                                {payment}
                            </label>
                        </div>
                    ))
                }
                <div className='mb-4 flex justify-between'>
                    <button
                        onClick={() => router.push('/shipping')}
                        type="button"
                        className='default-button'
                    >
                        Back
                    </button>
                    <button className='primary-button'>Next</button>
                </div>
            </form>
        </Layout>
    );
};

export default Payment;

Payment.auth = true;