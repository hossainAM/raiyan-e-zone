import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST': //sending ajax req to backend
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS': //after data fetched
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

const Order = () => {
    //order/:orderKey
    const {query} = useRouter();
    const orderKey = query.orderKey;

    //define useReducer hook
    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });
    //send ajax req to backend
    useEffect(() => {
       const fetchOrder = async () => {
            try{
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderKey}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }catch(err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
       };
       if(!order._id || (order._id && order._id !== orderKey)) {
        fetchOrder();
       }
    }, [order, orderKey]);

    return <Layout title={`Order ${orderKey}`}></Layout>
}

Order.auth = true;
export default Order;


