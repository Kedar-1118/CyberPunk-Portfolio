import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add trail effect
            setTrail((prev) => [
                ...prev.slice(-10),
                { x: e.clientX, y: e.clientY, id: `${Date.now()}-${Math.random()}` }
            ]);
        };

        const mouseEnter = (e) => {
            if (e.target.classList.contains('magnetic-btn') ||
                e.target.closest('.magnetic-btn')) {
                setCursorVariant('button');
            }
        };

        const mouseLeave = () => {
            setCursorVariant('default');
        };

        window.addEventListener('mousemove', mouseMove);
        document.querySelectorAll('.magnetic-btn, a, button').forEach((el) => {
            el.addEventListener('mouseenter', mouseEnter);
            el.addEventListener('mouseleave', mouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            document.querySelectorAll('.magnetic-btn, a, button').forEach((el) => {
                el.removeEventListener('mouseenter', mouseEnter);
                el.removeEventListener('mouseleave', mouseLeave);
            });
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            scale: 1,
        },
        button: {
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: 2,
        },
    };

    return (
        <>
            {/* Cursor trail */}
            {trail.map((point, index) => (
                <motion.div
                    key={point.id}
                    className="fixed pointer-events-none z-[9999] rounded-full"
                    style={{
                        width: '4px',
                        height: '4px',
                        background: `rgba(139, 92, 246, ${0.5 - index * 0.05})`,
                        left: 0,
                        top: 0,
                    }}
                    initial={{ x: point.x, y: point.y, opacity: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                />
            ))}

            {/* Main cursor */}
            <motion.div
                className="fixed pointer-events-none z-[10000] mix-blend-difference"
                variants={variants}
                animate={cursorVariant}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                }}
            >
                <div className="w-5 h-5 border-2 border-neon-purple rounded-full relative">
                    <div className="absolute inset-0 bg-neon-purple rounded-full opacity-30 animate-pulse-glow"></div>
                </div>
            </motion.div>

            {/* Cursor dot */}
            <motion.div
                className="fixed pointer-events-none z-[10001] bg-white rounded-full"
                style={{
                    width: '4px',
                    height: '4px',
                }}
                animate={{
                    x: mousePosition.x - 2,
                    y: mousePosition.y - 2,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 1000,
                    damping: 35,
                }}
            />
        </>
    );
};

export default CustomCursor;
