import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// A custom component to render the "Electrified P-Orbital"
function ElectrifiedOrbital() {
    const groupRef = useRef<THREE.Group>(null);

    // Create a parametric P-Orbital shape (dumbbell / p-orbital lobes)
    // We'll use a collection of lines to simulate the "probability density" feel
    const linesCount = 100;
    const pointsPerLine = 50;

    // Generate lines that follow a P-orbital distribution (approximate lobes)
    // A P-orbital has two lobes along an axis (say Y-axis)
    const lines = useMemo(() => {
        const tempLines: THREE.Vector3[][] = [];

        for (let i = 0; i < linesCount; i++) {
            const linePoints: THREE.Vector3[] = [];
            // Randomly assign to top (positive) or bottom (negative) lobe
            const lobeSign = Math.random() > 0.5 ? 1 : -1;

            // Each line starts near center and goes out, or spirals within the lobe
            const theta = Math.random() * Math.PI * 2; // Angle around Y axis
            const phiBase = Math.PI / 4; // Angle from Y axis (approximate lobe width)
            const phi = phiBase + (Math.random() - 0.5) * 0.5;

            for (let j = 0; j < pointsPerLine; j++) {
                const t = j / (pointsPerLine - 1);
                const radius = 2 + Math.random() * 0.5 + t * 3; // spread out

                // Convert spherical coords to cartesian, oriented along Y
                // x = r * sin(phi) * cos(theta)
                // y = r * cos(phi) * lobeSign + verticalOffset
                // z = r * sin(phi) * sin(theta)

                // Apply some "noise" or "electricity" jitter
                const jitter = 0.15;

                const x = radius * Math.sin(phi) * Math.cos(theta + t * 2) + (Math.random() - 0.5) * jitter;
                const y = radius * Math.cos(phi) * lobeSign + (Math.random() - 0.5) * jitter;
                const z = radius * Math.sin(phi) * Math.sin(theta + t * 2) + (Math.random() - 0.5) * jitter;

                linePoints.push(new THREE.Vector3(x, y, z));
            }
            tempLines.push(linePoints);
        }
        return tempLines;
    }, []);

    // Animation state for "settling"
    // We'll use a time uniform or just manipulate positions in useFrame
    useFrame((state) => {
        if (groupRef.current) {
            // Slowly rotate the whole orbital
            groupRef.current.rotation.y += 0.002;
            groupRef.current.rotation.z += 0.001;
        }
    });

    return (
        <group ref={groupRef}>
            {lines.map((linePoints, index) => (
                <Line
                    key={index}
                    points={linePoints}
                    color={index % 2 === 0 ? "#14b8a6" : "#c9a227"} // Teal and Gold
                    opacity={0.6}
                    width={1.5}
                />
            ))}
        </group>
    );
}

// Simple Line component using BufferGeometry
function Line({ points, color, opacity, width }: { points: THREE.Vector3[], color: string, opacity: number, width: number }) {
    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return geometry;
    }, [points]);

    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial
                attach="material"
                color={color}
                transparent
                opacity={opacity}
                linewidth={width} // Note: linewidth only works in WebGL2 or some browsers
                linecap="round"
                linejoin="round"
            />
        </line>
    );
}

// Particle field for extra "VFX" atmosphere
function Particles({ count = 200 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100;
            const factor = Math.random() * 10 + 5;
            const speed = Math.random() * 0.01 + 0.005;
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 15;
            temp.push({ time, factor, speed, x, y, z });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame(() => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            const { factor, speed, x, y, z } = particle;
            // Update particle rotation/position slightly
            const t = (particle.time += speed);

            dummy.position.set(
                x + Math.cos(t) + Math.sin(t * 1) / 10,
                y + Math.sin(t) + Math.cos(t * 2) / 10,
                z + Math.cos(t) + Math.sin(t * 3) / 10
            );

            const s = Math.cos(t) * 0.1 + 0.1; // Pulsing size
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);

            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#06b6d4" roughness={0.0} emissive="#06b6d4" emissiveIntensity={1} />
        </instancedMesh>
    );
}

export default function HeroOrbitalAnimation() {
    return (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.8, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Floating animated group */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ElectrifiedOrbital />
                </Float>

                <Particles />

                {/* Post Processing for Glow */}
                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
