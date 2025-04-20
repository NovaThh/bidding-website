import express from 'express';
import {
    addGemstone,
    deleteGemstone,
    getGemstones,
    getGemstoneWithID,
    updateGemstone,
    getBidsForGemstone,
    placeBidOnGemstone,
    sseStream
} from '../controllers/gemstoneController.js';
import {authenticateToken, isAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/gemstones', getGemstones);
router.get('/gemstones/:gemstoneId', getGemstoneWithID);
router.get('/gemstones/:gemstoneId/bids/stream', sseStream);

router.post('/gemstones', authenticateToken, isAdmin, addGemstone);
router.put('/gemstones/:gemstoneId', authenticateToken, isAdmin, updateGemstone);
router.delete('/gemstones/:gemstoneId', authenticateToken, isAdmin, deleteGemstone);

router.get('/gemstones/:gemstoneId/bids', getBidsForGemstone);
router.post('/gemstones/:gemstoneId/bids', authenticateToken, placeBidOnGemstone);

export default router;

