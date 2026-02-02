
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchPortfolioData = async () => {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
};

export const fetchGitHubStats = async (username) => {
    // Backend handles the token now
    const response = await fetch(`${API_URL}/github/stats?username=${username}`);
    if (!response.ok) throw new Error("Failed to fetch GitHub stats");
    return response.json();
};

export const sendContactMessage = async (data) => {
    const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to send message");
    return response.json();
};
