import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TextureLoader } from 'three';
import Image from 'next/image';
import gsap from 'gsap';
import * as THREE from 'three';

const tabs = [
  { id: "Cap", icon: "🧢" },
  { id: "Clothes", icon: "🥼" },
  { id: "Beard", icon: "🥸" },
];
const capIcons = [
  "/cap-boy-baseball-svgrepo-com.svg",
  "/cap-svgrepo-com.svg",
  "/santa-claus-cap-christmas-svgrepo-com.svg",
  "/knitted-cap-svgrepo-com.svg",
  "/halloween-witch-hat-svgrepo-com.svg",
];
const costumeIcons = [
  "/clothes-suit-svgrepo-com.svg",
  "/policeman-svgrepo-com.svg",
  "/costume-svgrepo-com.svg",
  "/chef-suit-svgrepo-com.svg",
  "/chef-svgrepo-com.svg",
];
const beardIcons = [
  "/man-with-goatbeard-and-moustache-svgrepo-com.svg",
  "/moustache-svgrepo-com.svg",
  "/beard-1.svg",
  "/fluffy-moustache-svgrepo-com.svg",
];

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState("Cap");
  const [selectedShape, setSelectedShape] = useState(null);
  const capRef = useRef([]);
  const costumeRef = useRef([]);
  const beardRef = useRef([]);
  const timeline = useRef(null);
  const [meshConfig, setMeshConfig] = useState({
    Costume1_Low: { visible: false },
    Costume2_Low: { visible: false },
    Costume3_Low: { visible: false },
    Costume4_Low: { visible: false },
    Costume5_Low: { visible: true },
    Red_C_Costume: { visible: false },
    GnomeCostume1_Low: { visible: true },
    Beard1_low: { visible: false },
    Beard2_low: { visible: true },
    Beard3_low: { visible: false },
    Beard4_low: { visible: false },
    Red_C_Beard: { visible: true },
    GnomeBeard_Low: { visible: false },
    Hat1_low: { visible: false },
    Hat2_low: { visible: false },
    Hat3_low: { visible: false },
    Hat4_low: { visible: false },
    Hat5_low: { visible: true },
    Red_C_Hat: { visible: false },
    Red_C_Body: { visible: true },
    GnomeHatDefault_Low: { visible: true },
  });

  const changeCostumeHandler = (index) => {
    setSelectedShape(index - 1)
    setMeshConfig((prevConfig) => {
      const updatedConfig = { ...prevConfig };

      // Reset visibility for all costumes
      Object.keys(updatedConfig).forEach((key) => {
        if (key.startsWith('Costume') || key === 'Red_C_Costume') {
          updatedConfig[key].visible = false;
        }
      });

      // Enable the selected costume
      updatedConfig[`Costume${index}_Low`].visible = true;

      return updatedConfig;
    });
  };

  const changeGapHandler = (index) => {
    setSelectedShape(index - 1)
    setMeshConfig((prevConfig) => {
      const updatedConfig = { ...prevConfig };

      // Reset visibility for all hats
      Object.keys(updatedConfig).forEach((key) => {
        if (key.startsWith('Hat') || key === 'Red_C_Hat') {
          updatedConfig[key].visible = false;
        }
      });
      // Enable the selected hat
      updatedConfig[`Hat${index}_low`].visible = true;

      return updatedConfig;
    });
  };
  const changeBeardHandler = (index) => {
    setSelectedShape(index - 1)
    setMeshConfig((prevConfig) => {
      const updatedConfig = { ...prevConfig };

      // Reset visibility for all beards
      Object.keys(updatedConfig).forEach((key) => {
        if (key.startsWith('Beard') || key === 'Red_C_Beard') {
          updatedConfig[key].visible = false;
        }
      });
      // Enable the selected beard
      updatedConfig[`Beard${index}_low`].visible = true;

      return updatedConfig;
    });
  };
  const animateItems = (items) => {
    // Clear any existing animations
    if (timeline.current) timeline.current.kill();

    // Create a new timeline for the animation
    timeline.current = gsap.timeline();

    timeline.current.fromTo(
      items,
      { x: -100, opacity: 0 }, // Starting state
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2, // Staggered animation for each item
        ease: "power3.out",
      }
    );
  };

  useEffect(() => {
    if (selectedTab === "Cap") {
      animateItems(capRef.current);
    } else if (selectedTab === "Clothes") {
      animateItems(costumeRef.current);
    } else if (selectedTab === "Beard") {
      animateItems(beardRef.current);
    }
  }, [selectedTab]);
  return (
    <div className='flex justify-between'>
      <div className='w-1/2 flex flex-col gap-y-8 ml-12 space-x-4 mt-24'>
        <div className="flex mb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex flex-col items-center justify-center px-4 py-2 ${selectedTab === tab.id ? "text-blue-500 font-bold" : "text-gray-400"
                }`}
              onClick={() => {
                setSelectedShape(null)
                setSelectedTab(tab.id)
              }
              }
            >
              <div className="text-2xl">{tab.icon}</div>
              <span className="text-sm">{tab.id}</span>
            </button>
          ))}
        </div>
        {selectedTab === "Cap" ? (
          <div>
            <div className="text-gray-200 font-semibold text-xl mb-5">Cap</div>
            <div className="rounded-full text-center p-2 gap-x-4 flex">
              {capIcons.map((icon, i) => (
                <div
                  key={i}
                  className={`rounded-full bg-white ${selectedShape === i ? 'shadow-indigo-500/50 border-2 border-indigo-600 h-28 w-28 scale-110' : 'h-24 w-24 scale-100'} flex items-center justify-center cursor-pointer textures`}
                  ref={(el) => (capRef.current[i] = el)} // Attach ref for GSAP
                  onClick={() => changeGapHandler(i + 1)}
                >
                  <Image
                    src={icon}
                    alt={`Cap ${i + 1}`}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : selectedTab === "Clothes" ? (
          <div>
            <div className="text-gray-200 font-semibold text-xl mb-5">
              Costume
            </div>
            <div className="rounded-full text-center p-2 gap-x-4 flex items-center">
              {costumeIcons.map((icon, i) => (
                <div
                  key={i}
                  className={`rounded-full bg-white ${selectedShape === i ? 'shadow-indigo-500/50 border-2 border-indigo-600 h-28 w-28 scale-110' : 'h-24 w-24 scale-100'} flex items-center justify-center cursor-pointer textures`}
                  ref={(el) => (costumeRef.current[i] = el)} // Attach ref for GSAP
                  onClick={() => changeCostumeHandler(i + 1)}
                >
                  <Image
                    src={icon}
                    alt={`Costume ${i + 1}`}
                    width={55}
                    height={55}
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-gray-200 font-semibold text-xl mb-5">Beard</div>
            <div className="rounded-full text-center p-2 gap-x-4 flex">
              {beardIcons.map((icon, i) => (
                <div
                  key={i}
                  className={`rounded-full bg-white ${selectedShape === i ? 'shadow-indigo-500/50 border-2 border-indigo-600 h-28 w-28 scale-110' : 'h-24 w-24 scale-100'} flex items-center justify-center cursor-pointer textures`}
                  ref={(el) => (beardRef.current[i] = el)} // Attach ref for GSAP
                  onClick={() => changeBeardHandler(i + 1)}
                >
                  <Image
                    src={icon}
                    alt={`Beard ${i + 1}`}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='w-1/2'>
        <Canvas style={{ width: '100%', height: '100vh' }} camera={{ fov: 85 }} dpr={[1, 2]} shadows>
          <Suspense fallback={null}>
            <ambientLight intensity={3.5} />

            <pointLight position={[0.1, -0.5, 2]} decay={0} intensity={0.1} />
            {/* <directionalLight intensity={0.5} position={[0.1, -0.1,0]} castShadow /> */}
            {/* <directionalLight intensity={1} position={[10, 10, 10]} castShadow /> */}
            <spotLight intensity={0.7} position={[5, 10, 5]} angle={0.3} penumbra={0.5} castShadow />

            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
            />
            <Box meshConfig={meshConfig} />
            <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={3} far={4} />
          </Suspense>
        </Canvas>
      </div>

    </div>
  );
}

const Box = ({ meshConfig }) => {
  const fbx = useLoader(FBXLoader, '/models/Chicken Dance.fbx');
  // const costume1Texture = useLoader(TextureLoader, '/models/Costumes_Low_Costume1Mat_AlbedoTransparency1.png');
  const mixer = useRef(null);
  const modelRef = useRef(null);
  
  const costume1BaseColor = useLoader(TextureLoader, '/models/Costume1Mat_Base_color.png');
  const costume1Metallic = useLoader(TextureLoader, '/models/Costume1Mat_Metallic.png');
  const costume1Normal = useLoader(TextureLoader, '/models/Costume1Mat_Normal_OpenGL.png');
  const costume1Roughness = useLoader(TextureLoader, '/models/Costume1Mat_Roughness.png');

  const costume2Texture = useLoader(TextureLoader, '/models/Costume2Mat_Base_color.png');
  const costume3Texture = useLoader(TextureLoader, '/models/Costume3Mat_Base_color.png');
  const costume4Texture = useLoader(TextureLoader, '/models/Costume4Mat_Base_color.png');
  const costume5Texture = useLoader(TextureLoader, '/models/Costume5Mat_Base_color.png');

  const hatTexture = useLoader(TextureLoader, '/models/HatsAndBeardsMat_Base_color.png');
  const hatMetallicTexture = useLoader(TextureLoader, '/models/HatsAndBeardsMat_Metallic.png');
  const hatNormalTexture = useLoader(TextureLoader, '/models/HatsAndBeardsMat_Normal_OpenGL.png');


  useEffect(() => {
    if (fbx) {
      fbx.traverse((child) => {
        if (child.isMesh) {
          // Set visibility dynamically based on meshConfig
          if (meshConfig[child.name]) {
            child.visible = meshConfig[child.name].visible;

            // Apply textures dynamically
            if (child.name === 'Costume1_Low') {
              // child.material.map = costume1Texture;
              child.material.map = costume1BaseColor; // Base color texture
              child.material.metalnessMap = costume1Metallic; // Metallic map
              child.material.normalMap = costume1Normal; // Normal map
              // child.material.roughnessMap = costume1Roughness; // Roughness map

            } else if (child.name === 'Costume2_Low') {
              child.material.map = costume2Texture;
            } else if (child.name === 'Costume3_Low') {
              child.material.map = costume3Texture;
            } else if (child.name === 'Costume4_Low') {
              child.material.map = costume4Texture;
            } else if (child.name === 'Costume5_Low') {
              child.material.map = costume5Texture;
            }

            if (child.name.startsWith("Hat") || child.name.startsWith("Beard") || child.name === 'Red_C_Hat' 
            ) {
              child.material.map = hatTexture; 
              child.material.metalnessMap = hatMetallicTexture; 
              child.material.normalMap = hatNormalTexture; 
            }
            child.material.metalness = 1;
            child.material.roughness = 1;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [fbx, meshConfig, costume1BaseColor, costume2Texture, costume3Texture, costume4Texture, costume5Texture]);
  
  useEffect(() => {
    if (fbx) {
      if (fbx.animations && fbx.animations.length > 0) {
        console.log('Animations:', fbx.animations);

        // Create an AnimationMixer
        mixer.current = new THREE.AnimationMixer(fbx);

        // Play the first animation
        const action = mixer.current.clipAction(fbx.animations[0]);
        action.play();
      }
    }
  }, [])
  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }

    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Adjust rotation speed as needed
    }
  });
  return <primitive  ref={modelRef} object={fbx} scale={[4, 4, 4]} position={[0, -2, 0]} />;
};
