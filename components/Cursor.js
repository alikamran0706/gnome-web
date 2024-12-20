import { useRef, useEffect, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { gsap } from "gsap";

// Custom Shader Material
const MirrorMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: [1, 1], // Default resolution (will be updated later)
  },
  `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  `varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = vUv;
    vec3 color = vec3(uv, sin(uTime) * 0.5 + 0.5);
    gl_FragColor = vec4(color, 1.0);
  }`
);

// Extend to the THREE namespace
extend({ MirrorMaterial });

export default function Cursor() {
  const cursorRef = useRef();
  const rotationRef = useRef(0);

  const [isClient, setIsClient] = useState(false); // Track whether the component is on the client side
  const [resolution, setResolution] = useState([1, 1]); // Default resolution to be updated on the client

  useEffect(() => {
    // Check if we are running on the client side
    if (typeof window !== "undefined") {
      setIsClient(true); // Set the state when we know we're on the client-side

      // Update resolution on window resize
      const updateResolution = () => {
        setResolution([window.innerWidth, window.innerHeight]);
      };

      // Initialize resolution when the component mounts
      updateResolution();

      // Add resize event listener
      window.addEventListener("resize", updateResolution);

      const handleMouseMove = (event) => {
        const { clientX: x, clientY: y } = event;

        // Screen aspect ratio
        const aspectRatio = window.innerWidth / window.innerHeight;

        // WebGL normalized coordinates (-1 to 1)
        const normalizedX = (x / window.innerWidth) * 2 - 1;
        const normalizedY = -(y / window.innerHeight) * 2 + 1;

        // Adjust for aspect ratio
        const worldX = normalizedX * aspectRatio * 4.5;
        const worldY = normalizedY * 4.5;

        // Determine target rotation
        const halfwayX = 0; // X = 0 is the center
        const targetRotation = normalizedX > halfwayX ? Math.PI / 2 : 0;

        if (cursorRef.current && cursorRef.current.rotation) {
          gsap.to(rotationRef, {
            current: targetRotation,
            duration: 0.5,
            onUpdate: () => {
              if (cursorRef.current) {
                cursorRef.current.rotation.z = rotationRef.current;
              }
            },
          });

          // Move cursor smoothly
          gsap.to(cursorRef.current.position, {
            x: worldX,
            y: worldY,
            duration: 0.2,
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Clean up listeners on component unmount
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", updateResolution);
      };
    }
  }, []); // The empty array ensures this effect runs once on mount

  useFrame(({ clock }) => {
    // If cursorRef has a material and uniforms, update the time uniform
    if (cursorRef.current?.material?.uniforms) {
      cursorRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  // Only render if we're on the client-side
  if (!isClient) return null;

  return (
    <>
      {/* Cursor Outline with Rotation */}
      <mesh ref={cursorRef} scale={2}>
        <ringGeometry args={[0.6, 0.8, 64]} /> {/* Large circular border */}
        {/* Use MirrorMaterial as a part of the R3F namespace */}
        {isClient && (
          <mirrorMaterial
            attach="material"
            uResolution={resolution} // Use the updated resolution
          />
        )}
      </mesh>
    </>
  );
}
