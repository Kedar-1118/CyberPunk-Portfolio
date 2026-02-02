
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/portfolio.json');

export const getPortfolioData = (req, res) => {
    try {
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        const data = JSON.parse(jsonData);
        res.json(data);
    } catch (error) {
        console.error("Error reading portfolio data:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
