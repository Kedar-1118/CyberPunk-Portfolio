import express from 'express';
import { getMessages, postMessage } from '../controllers/guestbook.controller.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/', postMessage);

export default router;
