import userModel from "../model/userSchema.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json('Bad request')
        }

        // if (password.length < 8 && password.includes(/^0-9/)) {
        //     res.status(400).json('Password must have 8 chacter and one number')
        // }

        const passwordhas = await bcrypt.hash(password, 16);
        console.log(passwordhas);

        console.log('start creating');
        const result = await userModel.create({
            email, password: passwordhas
        })
        console.log('done');



        return res.status(200).json('Account create succeful');




    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    let cookie = req.headers.cookie;
    let token = false;
    let authData = undefined;

    if (cookie) {
        const Array = cookie.split(';')
        token = Array.filter((e) => e.includes('token'))[0]
    }

    // if have a toke verify and get data from token
    if (token) {
        const tokenArray = token.split('=')
        authData = jwt.verify(tokenArray[1], 'asdfghjkuyg', (err, decode) => {
            if (err) {
                return undefined;
            }
            return decode
        });
    }
    console.log(authData);

    if (!authData) {
        return res.status(404);
    }

    let { age, dob, gender, mobile } = req.body;
    if (!age || !dob || !gender || !mobile) {
        return res.status(400).json({ message: "All filed must be filled" })
    }

    const existingUser = await userModel.findOne({ email: authData.email });

    if (!existingUser) {
        return res.status(404).json({ message: "User not exist" });
    }

    let newUser = existingUser;
    newUser.age = age;
    newUser.dob = dob;
    newUser.gender = gender;
    newUser.mobile = mobile;

    const userUpdate = await userModel.findByIdAndUpdate(existingUser._id, newUser, { new: true });

    return res.json(userUpdate);
}

export const getProfile =async (req, res) => {
    let cookie = req.headers.cookie;
    let token = false;
    let authData = undefined;

    if (cookie) {
        const Array = cookie.split(';')
        token = Array.filter((e) => e.includes('token'))[0]
    }

    // if have a toke verify and get data from token
    if (token) {
        const tokenArray = token.split('=')
        authData = jwt.verify(tokenArray[1], 'asdfghjkuyg', (err, decode) => {
            if (err) {
                return undefined;
            }
            return decode
        });
    }
    console.log(authData);

    if (!authData) {
        return res.status(404);
    }

    console.log('start');
    const existingUser = await userModel.findOne({ email: authData.email });

    console.log('done');
    return res.json(existingUser)


}

export const logout = async (req, res) => {
    
    try {
        res.status(202).clearCookie('token').send('logout')

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}