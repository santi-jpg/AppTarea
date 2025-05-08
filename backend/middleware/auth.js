import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here'; 

export default async function authMiddleware(req, res, next) {
    // grab the bearer token from authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        return res
        .status(401)
        .json({ success: false, message: 'not Authorized, token missing' });

    }

    //verify attach user object
    try{
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(payload.id).select('-password -__v');
        if (!user) {
            return res.status(401).json({ success: false, message: 'not Authorizared, user not found' });
    }
        req.user = user;
        next();
    }
    catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ success: false, message: 'Token invalid or expired' });

    }
}
