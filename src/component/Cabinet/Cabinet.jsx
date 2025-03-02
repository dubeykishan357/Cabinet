
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import { useRef, useState } from "react";
// import { gsap } from "gsap";

// const CabinetModel = () => {
//   const { scene } = useGLTF("/cabinet_preview_v8-1.glb"); 
//   const doorRef = useRef(); // दरवाजे का रेफरेंस
//   const [isOpen, setIsOpen] = useState(false);

//   // दरवाजे को क्लिक करने पर घुमाने का फंक्शन
//   const toggleDoor = () => {
//     gsap.to(doorRef.current.rotation, {
//       y: isOpen ? 0 : Math.PI / 2, // 90 डिग्री ओपन / बंद
//       duration: 1,
//       ease: "power2.inOut",
//     });
//     setIsOpen(!isOpen);
//   };

//   // मान लीजिए कि मॉडल में दरवाजा पहला child है (इसे मॉडल के हिसाब से बदल सकते हैं)
//   if (scene.children.length > 0) {
//     scene.children[0].ref = doorRef;
//   }

//   return (
//     <primitive
//       object={scene}
//       scale={1.5}
//       onClick={toggleDoor} // जब मॉडल पर क्लिक करें, तब फंक्शन चले
//     />
//   );
// };

// const ThreeDViewer = () => {
//   return (
//     <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[2, 2, 2]} />
//       <CabinetModel />
//       <OrbitControls />
//     </Canvas>
//   );
// };

// export default ThreeDViewer;