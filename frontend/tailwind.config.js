/** 
@type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Use CSS variables so themes can be changed dynamically
                'neon-blue': 'var(--neon-blue, #00f3ff)',
                'neon-pink': 'var(--neon-pink, #ff006e)',
                'neon-purple': 'var(--neon-purple, #8b5cf6)',
                'neon-green': 'var(--neon-green, #39ff14)',
                'neon-yellow': 'var(--neon-yellow, #ffff00)',
                'cyber-dark': 'var(--cyber-dark, #0a0e27)',
                'cyber-darker': 'var(--cyber-darker, #050714)',
                'cyber-light': 'var(--cyber-light, #1a1f3a)',
            },
            backgroundImage: {
                'cyber-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'neon-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'hologram': 'linear-gradient(135deg, #00f3ff, #8b5cf6, #ff006e)',
            },
            boxShadow: {
                'neon': '0 0 5px theme("colors.neon-blue"), 0 0 20px theme("colors.neon-blue")',
                'neon-pink': '0 0 5px theme("colors.neon-pink"), 0 0 20px theme("colors.neon-pink")',
                'neon-purple': '0 0 5px theme("colors.neon-purple"), 0 0 20px theme("colors.neon-purple")',
                'glow': '0 0 20px rgba(139, 92, 246, 0.5)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'gradient-shift': 'gradientShift 3s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    'from': {
                        boxShadow: '0 0 5px #00f3ff, 0 0 20px #00f3ff',
                    },
                    'to': {
                        boxShadow: '0 0 10px #00f3ff, 0 0 40px #00f3ff, 0 0 60px #00f3ff',
                    },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-100%)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                pulseGlow: {
                    '0%, 100%': {
                        opacity: 1,
                        boxShadow: '0 0 5px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
                    },
                    '50%': {
                        opacity: 0.8,
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.5)',
                    },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
