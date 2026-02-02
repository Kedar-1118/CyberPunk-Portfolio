import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { getPerformanceSettings } from '../utils/performance';

const ParticleField = ({ count = 200 }) => {
    const pointsRef = useRef();

    // Generate random positions for particles (memoized for performance)
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            // Slower rotation for better performance
            pointsRef.current.rotation.y += delta * 0.05;
            pointsRef.current.rotation.x += delta * 0.03;
        }
    });

    return (
        <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#8b5cf6"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
};

const Section3DBackground = ({ className = '', particleCount = 200 }) => {
    const performance = getPerformanceSettings();

    // Don't render 3D on low-end devices
    if (!performance.shouldUse3D || performance.prefersReducedMotion) {
        return null;
    }

    // Adjust particle count based on device capability
    const optimizedCount = Math.min(particleCount, performance.particleCount);

    return (
        <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: 1 }}>
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    dpr={[1, 1.5]} // Limit pixel ratio for performance
                    performance={{ min: 0.5 }} // Allow frame rate to drop if needed
                >
                    <ambientLight intensity={0.5} />
                    <ParticleField count={optimizedCount} />
                </Canvas>
            </Suspense>
        </div>
    );
};

export default React.memo(Section3DBackground);
