import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/analytics.json');

export const trackVisitor = (req, res, next) => {
    // Only track GET requests to root or api/data (page loads)
    if (req.method === 'GET' && (req.path === '/' || req.path === '/api/data')) {
        try {
            let analytics = { pageViews: 0, uniqueVisitors: [], events: [] };

            if (fs.existsSync(DATA_FILE)) {
                const data = fs.readFileSync(DATA_FILE, 'utf8');
                analytics = JSON.parse(data);
            }

            analytics.pageViews++;

            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            if (!analytics.uniqueVisitors.includes(ip)) {
                analytics.uniqueVisitors.push(ip);
            }

            // Keep only last 1000 visitors to save space
            if (analytics.uniqueVisitors.length > 1000) {
                analytics.uniqueVisitors = analytics.uniqueVisitors.slice(-1000);
            }

            fs.writeFileSync(DATA_FILE, JSON.stringify(analytics, null, 2));
        } catch (error) {
            console.error('Analytics error:', error);
        }
    }
    next();
};

export const getAnalytics = (req, res) => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return res.json({ pageViews: 0, uniqueVisitors: 0 });
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const analytics = JSON.parse(data);
        res.json({
            pageViews: analytics.pageViews,
            uniqueVisitors: analytics.uniqueVisitors.length,
            events: analytics.events
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics' });
    }
}
