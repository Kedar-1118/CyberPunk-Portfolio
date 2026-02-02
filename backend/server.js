import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import dataRoutes from './routes/data.routes.js';
import githubRoutes from './routes/github.routes.js';
import contactRoutes from './routes/contact.routes.js';
import guestbookRoutes from './routes/guestbook.routes.js';

dotenv.config({ path: './.env' }); // Load env from root

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
import { trackVisitor, getAnalytics } from './middleware/analytics.js';

app.use(cors());
app.use(express.json());
app.use(trackVisitor);

// Routes
app.get('/api/admin/analytics', getAnalytics);
app.use('/api/data', dataRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/guestbook', guestbookRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Portfolio Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
