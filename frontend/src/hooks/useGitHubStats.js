
import { useState, useEffect } from 'react';
import { fetchGitHubStats } from '../services/github';

export const useGitHubStats = (username) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStats = async () => {
            const token = import.meta.env.VITE_GITHUB_TOKEN;
            if (!token) {
                setError("GitHub token not found in .env");
                setLoading(false);
                return;
            }

            try {
                const data = await fetchGitHubStats(username, token);
                setStats(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch GitHub stats:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            getStats();
        }
    }, [username]);

    return { stats, loading, error };
};
