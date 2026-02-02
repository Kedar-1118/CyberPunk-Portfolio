import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPortfolioData } from '../services/api';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchPortfolioData();
                setData(result);
            } catch (err) {
                console.error("Error loading portfolio data:", err);
                setError(err.message);
                // Fallback or retry logic could go here
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Helper to safely access data even if loading/error (returns empty defaults or null)
    const getSectionData = (section) => {
        if (!data) return null;
        return data[section];
    };

    const value = {
        data,
        loading,
        error,
        personalInfo: getSectionData('personalInfo'),
        skills: getSectionData('skills') || [],
        rotatingSkills: getSectionData('rotatingSkills') || [],
        projects: getSectionData('projects') || [],
        experience: getSectionData('experience') || [],
        achievements: getSectionData('achievements') || [],
        socialLinks: getSectionData('socialLinks') || [],
        learningGoals: getSectionData('learningGoals') || [],
        timelineMilestones: getSectionData('timelineMilestones') || [],
        techStack: getSectionData('techStack') || {},
        commandPaletteActions: getSectionData('commandPaletteActions') || [],
        themes: getSectionData('themes') || {},
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};
