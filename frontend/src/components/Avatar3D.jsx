import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Holographic Avatar Sphere
const HolographicSphere = () => {
    const meshRef = useRef();
    const particlesRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.mouse.y * 0.2;
            meshRef.current.rotation.y = state.mouse.x * 0.2;
        }
    });

    // Create particle system
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 2.5 + Math.random() * 0.5;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return (
        <>
            {/* Main holographic sphere */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sphere ref={meshRef} args={[2, 64, 64]}>
                    <MeshDistortMaterial
                        color="#8b5cf6"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                        wireframe
                        transparent
                        opacity={0.6}
                        emissive="#8b5cf6"
                        emissiveIntensity={0.5}
                    />
                </Sphere>
            </Float>

            {/* Particle system around sphere */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color="#00f3ff"
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>
        </>
    );
};

// Main 3D Avatar Component
const Avatar3D = ({ className = '' }) => {
    return (
        <div className={`relative ${className}`} style={{ width: '400px', height: '400px' }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" />
                <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ff006e" />
                <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#00f3ff" />

                {/* Holographic Sphere */}
                <HolographicSphere />
            </Canvas>
        </div>
    );
};

export default Avatar3D;
