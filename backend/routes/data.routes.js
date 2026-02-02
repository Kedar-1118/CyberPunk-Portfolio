
import express from 'express';
import { getPortfolioData } from '../controllers/data.controller.js';

const router = express.Router();

router.get('/', getPortfolioData);

export default router;
