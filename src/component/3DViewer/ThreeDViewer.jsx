


import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";
import { gsap } from "gsap";

const HandleContextLoss = () => {
  const { gl } = useThree();
  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn("WebGL Context Lost! Recovering...");
      gl.forceContextRestore();
    };
    gl.domElement.addEventListener("webglcontextlost", handleContextLost);
    return () => gl.domElement.removeEventListener("webglcontextlost", handleContextLost);
  }, [gl]);
  return null;
};

const CabinetModel = () => {
  const { scene } = useGLTF("/cabinet_preview_v8-1.glb");
  const [door, setDoor] = useState(null);
  const [drawer, setDrawer] = useState(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === "wood_door") {
        setDoor(child);
        console.log("✅ Door found:", child);
      }
      if (child.name === "wood_drawer") {
        setDrawer(child);
        console.log("✅ Drawer found:", child);
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!door || !drawer) return;

    console.log("🎯 Setting initial positions for Door & Drawer!");

    // Door ko sahi jagah set karne ke liye 

    door.scale.set(1.6, 1.7, 1);
    door.position.set(-0.3, 0.4, 0.4);
    door.rotation.set(0,0,0);

    // 🗄️ Drawer ki sahi Initial Position ko set karne ke liye

    drawer.position.set(0, 1.0, 0.45); 
    drawer.scale.set(1.5, 1.2, 1);
    

    door.updateMatrixWorld(true);
    drawer.updateMatrixWorld(true);
  }, [door, drawer]);

   const toggleDoor = (event) => {
    event.stopPropagation();
    if (!door) return;
    console.log("🚪 Door Clicked!");
    gsap.to(door.rotation, {
      y: door.rotation.y === 0 ? -Math.PI / 2 : 0, // -Math.PI ka use karke door bahar open Karte hai
      duration: 1,
      onUpdate: () => door.updateMatrixWorld(),
    });
  };

  const toggleDrawer = (event) => {
    event.stopPropagation();
    if (!drawer) return;
    console.log("🗄️ Drawer Clicked!");
    gsap.to(drawer.position, {
      z: drawer.position.z === 0.45 ? 0.75 : 0.45, // drawer
      duration: 1,
      onUpdate: () => drawer.updateMatrixWorld(),
    });
  };
 
  return (
    <group>
      {door && <primitive object={door} onPointerDown={toggleDoor} />}
      {drawer && <primitive object={drawer} onPointerDown={toggleDrawer} />}
      <primitive object={scene} scale={1.5} />
    </group>
  );
};

const ThreeDViewer = () => {
  return (
    <Canvas
      camera={{ position: [2, 2, 5], fov: 50 }}
      onPointerDown={(event) => {
        event.stopPropagation();
        console.log("🖱 Canvas Clicked!");
      }}
    >
      <HandleContextLoss />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <CabinetModel />
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDViewer;
