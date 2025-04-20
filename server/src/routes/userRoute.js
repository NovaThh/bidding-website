import express from 'express';
import {
    getUsers,
    getUserWithID,
    registerUser,
    logIn,
    getUserWins
} from '../controllers/userController.js';
import {authenticateToken} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users',authenticateToken, getUsers);
router.get('/users/:userId',authenticateToken, getUserWithID);

router.post('/users', registerUser);
router.post('/tokens', logIn);

router.get('/users/:userId/wins', authenticateToken, getUserWins);

export default router;
