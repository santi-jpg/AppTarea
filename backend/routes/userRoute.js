import expres from 'express';
import { registerUser, loginUser, getCurrentUser, updateProfile, changePassword } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';


const router = expres.Router();

// public link
router.post('/register', registerUser);
router.post('/login', loginUser);

// private link protect also
router.get('/me', authMiddleware, getCurrentUser);
router.put('/profile', authMiddleware,updateProfile);
router.put('/password',authMiddleware, changePassword);

export default router;