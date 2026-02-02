import { useCallback, useEffect, useRef, useState } from 'react';

export const useSound = () => {
    const [isMuted, setIsMuted] = useState(false);
    const audioContext = useRef(null);

    useEffect(() => {
        // Initialize AudioContext on first user interaction
        const initAudio = () => {
            if (!audioContext.current) {
                audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioContext.current.state === 'suspended') {
                audioContext.current.resume();
            }
        };

        window.addEventListener('click', initAudio);
        window.addEventListener('keydown', initAudio);

        return () => {
            window.removeEventListener('click', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
    }, []);

    const playTone = useCallback((frequency, type = 'sine', duration = 0.1, volume = 0.1) => {
        if (isMuted || !audioContext.current) return;

        const ctx = audioContext.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(ctx.currentTime + duration);
    }, [isMuted]);

    const playHover = useCallback(() => {
        // High pitched short tick
        playTone(800, 'sine', 0.05, 0.02);
    }, [playTone]);

    const playClick = useCallback(() => {
        // Lower pitched select sound
        playTone(400, 'triangle', 0.1, 0.05);
        setTimeout(() => playTone(600, 'triangle', 0.1, 0.03), 50);
    }, [playTone]);

    const playSuccess = useCallback(() => {
        // Ascending chime
        playTone(400, 'sine', 0.2, 0.05);
        setTimeout(() => playTone(500, 'sine', 0.2, 0.05), 100);
        setTimeout(() => playTone(600, 'sine', 0.4, 0.05), 200);
    }, [playTone]);

    const toggleMute = () => setIsMuted(prev => !prev);

    return {
        playHover,
        playClick,
        playSuccess,
        isMuted,
        toggleMute
    };
};
