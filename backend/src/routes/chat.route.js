import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getUsersForSidebar, getMessages, sendMessage, markMessagesAsSeen } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/users', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);
router.put('/mark-seen/:id', protectRoute, markMessagesAsSeen);

export default router;