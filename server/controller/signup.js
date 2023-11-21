import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import userModel from "../model/userSchema.js";

//   {domainname}/api/user/signin
export const signin = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase()

        // All filed are fill or not
        if (!email || !password) {
            return res.status(400).json({ message: "All filed must be filled" })
        }

        const existingUser = await userModel.findOne({ email }).select("+password");

        if (!existingUser) {
            return res.status(404).json({ message: "User not exist" });
        }

        const passwordCheck = await bcrypt.compare(password, existingUser.password);

        if (!passwordCheck) {
            return res.status(400).json({ message: "incorrect password" });
        } else {
            const token = jwt.sign({email: existingUser.email},'asdfghjkuyg',{expiresIn: '1h'})
            return res.cookie('token', token, {httpOnly: true}).json('login')
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "somthing went wrong" });
    }
}
