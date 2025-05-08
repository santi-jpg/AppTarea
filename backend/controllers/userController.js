import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRATION = '1d'; // Token expiration time

const createToken = (userId) => jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

//Register function 
export async function registerUser(req, res) {
    const { name, email, password } = req.body;
    
        // Validate the input data
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Check if the user already exists
        try {
        if (await userModel.findOne({ email })) {
            return res.status(400).json({ message: 'userModel already exists' });
        }
        const hasehed = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hasehed });
        const token = createToken(user._id);
        res.status(201).json({ user: { name: user.name, email: user.email, _id: user._id }, token });
        } catch (error) {
            console.log(err);
            res.status(500).json({ message: 'Server error' });
        }
    
    }

    //Login function
export async function loginUser(req, res) {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ message: 'faltan campos por completar' });
        }

        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ success : false, message: 'Email and password required' });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ success : false, message: 'Invalid credentials' });
            }
            const token = createToken(user._id);
            res.json({ success : true, token, user: { name: user.name, email: user.email, _id: user._id } });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // get current user 
    export async function getCurrentUser(req, res) {
        try {
            const user = await userModel.findById(req.user._id).select('name email');
            if (!user) {
                return res.status(404).json({success : true , message: 'userModel not found' });
            }
            res.json({ success : true, user });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    //update user profile
export async function updateProfile(req, res) {
    const { name, email } = req.body;
    const userId = req.user._id;

    if (!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({ message: 'valid name and email required' });
    }

    try {
       const exists = await userModel.findOne({ email, _id: { $ne: userId } });
        if (exists) {
            return res.status(409).json({success : false , message: 'Email already in use' });
        }
        const user = await userModel.findByIdAndUpdate(
           req.user._id,
            { name, email },
            { new: true, runValidators: true , select: 'name email' }
        );
        res.json({ success : true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

//change password function
export async function changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
  if (!currenPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ success : false, message: 'Passwor invalid or too short' });
}
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success : false, message: 'userModel not found' });
        }
    
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            return res.status(401).json({ success : false, message: 'Current password incorrect' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ success : true, message: 'Password updated successfully' }); 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }

}
