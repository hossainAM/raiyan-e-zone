import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel'
import valid from "../../../utils/valid";
import bcrypt from 'bcrypt'

connectDB();

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await signup(req, res)
            break;
    }
}

const signup = async (req, res) => {
    try{
        const { name, email, password, cf_password } = req.body;
        const errMessage = valid(name, email, password, cf_password);
        if(errMessage) return res.status(400).json({err: errMessage});

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new Users({
            name,
            email,
            password: passwordHash,
            cf_password
        });

        console.log(newUser);

        res.json({message: 'Sign Up Success!'});
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}