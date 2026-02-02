import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/guestbook.json');

export const getMessages = async (req, res) => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return res.status(200).json([]);
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const messages = JSON.parse(data);
        // Return latest messages first
        res.status(200).json(messages.reverse());
    } catch (error) {
        console.error('Error reading guestbook:', error);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};

export const postMessage = async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ message: 'Name and message are required' });
        }

        let messages = [];
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            messages = JSON.parse(data);
        }

        const newMessage = {
            id: Date.now().toString(),
            name,
            message,
            timestamp: new Date().toISOString()
        };

        messages.push(newMessage);

        // Limit to last 50 messages to prevent infinite growth
        if (messages.length > 50) {
            messages = messages.slice(-50);
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).json({ message: 'Failed to post message' });
    }
};
