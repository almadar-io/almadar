// @ts-nocheck
import React, { useRef, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// Normalized P-orbital shape function
function getPOrbitalPoint(theta: number, phi: number, scale: number) {
    // r = scale * |cos(theta)| ^ 1.2
    const r = scale * Math.pow(Math.abs(Math.cos(theta)), 1.2);
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.cos(theta);
    const z = r * Math.sin(theta) * Math.sin(phi);
    return new THREE.Vector3(x, y, z);
}

function AnimatedLine({ phi, scale, color }: { phi: number, scale: number, color: string }) {
    const lineRef = useRef<any>(null);
    const pointsPerLine = 64;

    // Generate Source (Sphere/Chaos) and Target (P-Orbital) points
    const { startPoints, endPoints, currentPoints } = useMemo(() => {
        const start = [];
        const end = [];
        const current = [];

        for (let j = 0; j <= pointsPerLine; j++) {
            const theta = (j / pointsPerLine) * Math.PI;

            // Target: P-Orbital
            const p = getPOrbitalPoint(theta, phi, scale);
            end.push(p);

            // Source: Expanded Sphere (Chaos/Dispersed)
            // We disperse them outwards based on their P-orbital position to make it look like they "compress" in
            const s = p.clone().normalize().multiplyScalar(scale * 3); // Large sphere
            // Add some noise to start
            s.x += (Math.random() - 0.5) * 2;
            s.y += (Math.random() - 0.5) * 2;
            s.z += (Math.random() - 0.5) * 2;

            start.push(s);
            current.push(s.clone());
        }
        return { startPoints: start, endPoints: end, currentPoints: current };
    }, [phi, scale]);

    useLayoutEffect(() => {
        if (lineRef.current) {
            const geo = new THREE.BufferGeometry().setFromPoints(currentPoints); // Init
            lineRef.current.geometry = geo;
        }
    }, []);

    useFrame((state) => {
        if (!lineRef.current) return;

        // Animation Progress: 0 -> 1 over time
        // Easing: easeOutCubic = 1 - pow(1 - x, 3)
        let t = Math.min(1, state.clock.getElapsedTime() * 0.4); // Slow converge over ~2.5s
        t = 1 - Math.pow(1 - t, 3);

        // Update vectors
        for (let i = 0; i < currentPoints.length; i++) {
            currentPoints[i].lerpVectors(startPoints[i], endPoints[i], t);
        }

        // Update geometry
        lineRef.current.geometry.setFromPoints(currentPoints);
    });

    return (
        <line ref={lineRef}>
            <lineBasicMaterial color={color} transparent opacity={0.5} linewidth={1} />
        </line>
    );
}

// A component that renders a structured P-Orbital (dumbbell shape)
// using smooth lines along longitudinal curves.
function StructuredOrbital({ color = "#06b6d4", scale = 3.5 }) {
    const groupRef = useRef<THREE.Group>(null);

    // Number of longitudinal lines (meridians)
    const meridianCount = 24;

    // Generate angles for lines
    const phis = useMemo(() => {
        return new Array(meridianCount).fill(0).map((_, i) => (i / meridianCount) * Math.PI * 2);
    }, []);

    // Slowly rotate the entire structure
    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.getElapsedTime();
            groupRef.current.rotation.y = t * 0.15;
            groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.1; // Gentle sway
        }
    });

    return (
        <group ref={groupRef}>
            {phis.map((phi, i) => (
                <AnimatedLine key={i} phi={phi} scale={scale} color={color} />
            ))}

        </group>
    );
}

export default function HeroOrbitalAnimation() {
    return (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.9, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />

                {/* Floating animated group */}
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                    <StructuredOrbital scale={3.2} color="#22d3ee" /> {/* Cyan */}
                </Float>

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={2.0} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

