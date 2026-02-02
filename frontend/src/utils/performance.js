// Performance detection utility
export const detectPerformance = () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && !isMobile;

    // Detect hardware capabilities
    const canvas = document.createElement('canvas');
    const gl = canvas.getGL || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasWebGL = !!gl;

    // Check GPU tier (basic heuristic)
    let gpuTier = 'high';
    if (isMobile) {
        gpuTier = 'low';
    } else if (isTablet) {
        gpuTier = 'medium';
    }

    // Check CPU cores (if available)
    const cores = navigator.hardwareConcurrency || 2;
    if (cores <= 2) {
        gpuTier = 'low';
    } else if (cores <= 4) {
        gpuTier = 'medium';
    }

    // Check memory (if available)
    const memory = navigator.deviceMemory || 4;
    if (memory <= 2) {
        gpuTier = 'low';
    }

    return {
        isMobile,
        isTablet,
        isDesktop: !isMobile && !isTablet,
        hasWebGL,
        gpuTier,
        cores,
        memory,
        prefersReducedMotion,
        // Performance recommendations
        shouldUse3D: hasWebGL && !prefersReducedMotion && gpuTier !== 'low',
        particleCount: gpuTier === 'high' ? 300 : gpuTier === 'medium' ? 150 : 50,
        shouldLazyLoad: true,
        shouldReduceAnimations: prefersReducedMotion || gpuTier === 'low'
    };
};

// Get cached performance settings
let cachedPerformance = null;
export const getPerformanceSettings = () => {
    if (!cachedPerformance) {
        cachedPerformance = detectPerformance();
    }
    return cachedPerformance;
};
