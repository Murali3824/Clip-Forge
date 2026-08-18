import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";

function Bubble({ position, scale, speed = 0.5, mouse, hue = "#ffffff" }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.15;
    ref.current.position.x =
      position[0] + Math.cos(t * speed * 0.8) * 0.1 + mouse.current.x * 0.4;
    ref.current.position.z = position[2] + mouse.current.y * 0.2;
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.y = t * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          transmission={0.98}
          thickness={0.6}
          roughness={0.05}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.05}
          color={hue}
          attenuationColor="#dbe4ff"
          attenuationDistance={2.4}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 80 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#2E5BFF"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#dbeafe" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#ffffff" />
      <Environment preset="apartment" background={false} />
      <Bubble position={[-3.6, 1.6, -1.2]} scale={0.55} speed={0.6} mouse={mouse} />
      <Bubble position={[3.8, -0.8, -0.5]} scale={0.72} speed={0.4} mouse={mouse} />
      <Bubble position={[-2.9, -1.8, 0.4]} scale={0.32} speed={0.7} mouse={mouse} />
      <Bubble position={[3.1, 1.9, 0]} scale={0.42} speed={0.55} mouse={mouse} />
      <Bubble position={[-4.8, 0.2, -1.6]} scale={0.28} speed={0.55} mouse={mouse} />
      <Bubble position={[4.6, 2.4, -1.2]} scale={0.22} speed={0.75} mouse={mouse} />
      <Bubble position={[0, -2.2, -2.5]} scale={0.65} speed={0.3} mouse={mouse} hue="#f0f4ff" />
      <Particles />
    </>
  );
}

export default function HeroCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current.x = x;
    mouse.current.y = y;
  };

  return (
    <div
      className="absolute inset-0"
      onMouseMove={onMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
