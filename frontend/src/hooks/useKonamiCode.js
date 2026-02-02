import { useState, useEffect } from 'react';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

export const useKonamiCode = () => {
    const [success, setSuccess] = useState(false);
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeys((prevKeys) => {
                const newKeys = [...prevKeys, e.key].slice(-KONAMI_CODE.length);

                const matches = newKeys.every((key, index) => key === KONAMI_CODE[index]);

                if (matches) {
                    setSuccess(true);
                    return [];
                }

                return newKeys;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const reset = () => {
        setSuccess(false);
        setKeys([]);
    };

    return { success, reset };
};
