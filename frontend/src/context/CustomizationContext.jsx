import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomizationContext = createContext();

export const useCustomization = () => {
    const context = useContext(CustomizationContext);
    if (!context) {
        throw new Error('useCustomization must be used within CustomizationProvider');
    }
    return context;
};

export const CustomizationProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        // Load from localStorage if available
        const saved = localStorage.getItem('portfolioSettings');
        return saved ? JSON.parse(saved) : {
            theme: 'cyberpunk',
            particleDensity: 50,
            animationSpeed: 100,
            reduceMotion: false
        };
    });

    useEffect(() => {
        // Save to localStorage whenever settings change
        localStorage.setItem('portfolioSettings', JSON.stringify(settings));

        // Apply reduce motion to document
        if (settings.reduceMotion) {
            document.documentElement.style.setProperty('--animation-speed', '0s');
            document.body.classList.add('reduce-motion');
        } else {
            document.documentElement.style.setProperty('--animation-speed', `${settings.animationSpeed / 100}s`);
            document.body.classList.remove('reduce-motion');
        }

        // Apply animation speed
        document.documentElement.style.setProperty('--speed-multiplier', settings.animationSpeed / 100);

        // Apply particle density (will be used by particle components)
        document.documentElement.style.setProperty('--particle-density', settings.particleDensity / 100);

    }, [settings]);

    return (
        <CustomizationContext.Provider value={{ settings, setSettings }}>
            {children}
        </CustomizationContext.Provider>
    );
};
