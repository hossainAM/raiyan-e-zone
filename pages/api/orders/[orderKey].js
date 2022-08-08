//backend API to get order info from db: /api/orders/:orderKey

import { getSession } from "next-auth/react"
import Order from "../../../models/orderDetails";
import db from "../../../utils/db";

const handler = async (req, res) => {
    const session = await getSession({ req }); //to get the user
    if(!session) {
        return res.status(401).send('Signin required');
    }

    await db.connect();

    const order = await Order.findById(req.query.orderKey);
    await db.disconnect();
    res.send(order);
}

export default handler;