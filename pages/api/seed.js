import User from "../../models/UserDetails";
import Product from "../../models/ProductDetails";
import data from "../../utils/data";
import db from "../../utils/db";

//seed API
const handler = async (req, res) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.disconnect();
    // eslint-disable-next-line no-undef
    res.send({ message: 'seeded successfully' });
};
export default handler;