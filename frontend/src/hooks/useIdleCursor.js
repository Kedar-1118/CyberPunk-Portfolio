import { useEffect, useRef } from 'react';

export const useIdleCursor = (idleTime = 10000) => {
    const idleTimerRef = useRef(null);
    const isIdleRef = useRef(false);
    const currentTabRef = useRef(0);

    const navTabs = [
        { id: 'hero', label: 'Home', selector: '#hero' },
        { id: 'about', label: 'About', selector: '#about' },
        { id: 'skills', label: 'Skills', selector: '#skills' },
        { id: 'tech-stack', label: 'Tech Stack', selector: '#tech-stack' },
        { id: 'projects', label: 'Projects', selector: '#projects' },
        { id: 'timeline', label: 'Timeline', selector: '#timeline' },
    ];

    const animateCursorToElement = (element) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        // Create a temporary cursor element to show the animation
        const ghostCursor = document.createElement('div');
        ghostCursor.className = 'fixed pointer-events-none z-[10002]';
        ghostCursor.style.cssText = `
            width: 30px;
            height: 30px;
            border: 2px solid #8b5cf6;
            border-radius: 50%;
            left: ${window.innerWidth / 2}px;
            top: ${window.innerHeight / 2}px;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
            transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(ghostCursor);

        // Animate to target
        setTimeout(() => {
            ghostCursor.style.left = `${targetX}px`;
            ghostCursor.style.top = `${targetY}px`;
        }, 50);

        // Click effect
        setTimeout(() => {
            ghostCursor.style.transform = 'translate(-50%, -50%) scale(0.8)';

            // Scroll to section
            const section = document.querySelector(navTabs[currentTabRef.current].selector);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 1500);

        // Remove ghost cursor
        setTimeout(() => {
            ghostCursor.remove();
        }, 2000);
    };

    const startIdleAnimation = () => {
        if (isIdleRef.current) return;
        isIdleRef.current = true;

        const animationInterval = setInterval(() => {
            if (!isIdleRef.current) {
                clearInterval(animationInterval);
                return;
            }

            // Move to next tab
            currentTabRef.current = (currentTabRef.current + 1) % navTabs.length;

            // Find the nav button or section
            const sectionElement = document.querySelector(navTabs[currentTabRef.current].selector);

            if (sectionElement) {
                animateCursorToElement(sectionElement);
            }
        }, 4000); // Move to next tab every 4 seconds
    };

    const resetIdleTimer = () => {
        isIdleRef.current = false;

        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
        }

        idleTimerRef.current = setTimeout(() => {
            startIdleAnimation();
        }, idleTime);
    };

    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'wheel'];

        events.forEach(event => {
            window.addEventListener(event, resetIdleTimer, { passive: true });
        });

        // Start initial timer
        resetIdleTimer();

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, resetIdleTimer);
            });

            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
            }

            isIdleRef.current = false;
        };
    }, [idleTime]);

    return { isIdle: isIdleRef.current };
};
