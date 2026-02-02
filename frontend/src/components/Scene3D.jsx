import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { getPerformanceSettings } from '../utils/performance';

const FloatingShape = ({ position, rotationSpeed, shape }) => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * rotationSpeed[0];
            meshRef.current.rotation.y += delta * rotationSpeed[1];
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            {shape === 'box' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
            {shape === 'sphere' && <sphereGeometry args={[0.3, 16, 16]} />}
            {shape === 'torus' && <torusGeometry args={[0.3, 0.1, 8, 16]} />}
            <meshStandardMaterial
                color="#8b5cf6"
                wireframe
                emissive="#8b5cf6"
                emissiveIntensity={0.3}
            />
        </mesh>
    );
};

const Scene3D = () => {
    const performance = getPerformanceSettings();

    // Don't render on low-end devices or if user prefers reduced motion
    if (!performance.shouldUse3D || performance.prefersReducedMotion) {
        return null;
    }

    // Reduce number of shapes based on device
    const shapeCount = performance.gpuTier === 'high' ? 6 : performance.gpuTier === 'medium' ? 4 : 2;

    const shapes = [
        { type: 'box', pos: [-2, 0, -2], speed: [0.2, 0.3] },
        { type: 'sphere', pos: [2, -1, -3], speed: [0.15, 0.25] },
        { type: 'torus', pos: [0, 1, -4], speed: [0.25, 0.2] },
        { type: 'box', pos: [-3, -2, -5], speed: [0.3, 0.15] },
        { type: 'sphere', pos: [3, 2, -3], speed: [0.2, 0.35] },
        { type: 'torus', pos: [1, -1, -6], speed: [0.15, 0.3] },
    ].slice(0, shapeCount);

    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    dpr={[1, 1.5]} // Limit pixel ratio
                    performance={{ min: 0.5 }} // Allow adaptive performance
                >
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff006e" />

                    {shapes.map((shape, idx) => (
                        <FloatingShape
                            key={idx}
                            position={shape.pos}
                            rotationSpeed={shape.speed}
                            shape={shape.type}
                        />
                    ))}
                </Canvas>
            </Suspense>
        </div>
    );
};

export default React.memo(Scene3D);
