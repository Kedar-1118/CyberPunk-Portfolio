
import express from 'express';
import { getGitHubStats } from '../controllers/github.controller.js';

const router = express.Router();

router.get('/stats', getGitHubStats);

export default router;
