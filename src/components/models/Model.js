import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <h2 id="loading">{progress} % loaded</h2>
    </Html>
  );
}

const Model = () => {
  const gltf = useLoader(
    GLTFLoader,
    "/MRI_scan.gltf"
  );
  return (
    <>
      <primitive object={gltf.scene} scale={0.7} dispose={null} />
    </>
  );
};

const Head = (props) => {
  return (
    <div className='w-96 h-96 mt-5 ml-10'>
      <p className={'text-base text-center p-2 rounded-tr-xl rounded-tl-xl '+(props.color)}>{props.id}</p>
      <Canvas camera={{ position: [20, 50, 100] }}>
        <Suspense fallback={<Loader />}>
          <mesh>
          <Model />
          </mesh>
          <OrbitControls autoRotate autoRotateSpeed={0.6} />
          <Environment preset="sunset" background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Head;