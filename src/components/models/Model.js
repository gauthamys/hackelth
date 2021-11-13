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
    <div className='h-96 mt-4 border'>
      <p className={'text-base shadow-2xl text-center p-2 bg-gray-200 text-gray-900'}>{props.id}</p>
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