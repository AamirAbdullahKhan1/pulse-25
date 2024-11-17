import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Points, PointMaterial, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PatternMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.5, 0.2, 1.0), // More vibrant purple
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    
    void main() {
      // Create a more visible hexagonal pattern
      vec2 st = vUv * 8.0;
      
      // Animate the pattern
      float t = uTime * 0.2;
      st.x += sin(st.y * 2.0 + t) * 0.1;
      st.y += cos(st.x * 2.0 + t) * 0.1;
      
      // Hexagonal grid
      vec2 grid = st * vec2(1.732051, 2.0);
      vec2 gv = fract(grid) - 0.5;
      float d = length(gv) * exp(-length(vUv - 0.5));
      
      // Create pulsing effect
      float pulse = sin(t + length(vUv - 0.5) * 5.0) * 0.5 + 0.5;
      
      // Final color
      vec3 color = mix(vec3(0.0), uColor, smoothstep(0.2, 0.1, d) * pulse);
      float alpha = smoothstep(0.4, 0.2, d) * 0.5;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ PatternMaterial });

function Pattern() {
  const materialRef = useRef();
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[4, 4, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore */}
      <patternMaterial ref={materialRef} transparent={true} />
    </mesh>
  );
}

function Stars() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const radius = Math.random() * 2 + 1;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      
      positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(theta);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ background: 'black' }}
      >
        <Pattern />
        <Stars />
      </Canvas>
    </div>
  );
}