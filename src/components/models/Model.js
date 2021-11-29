import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = (props) => {
  const gltf = useLoader(
    GLTFLoader,
    "/MRI_scan.gltf"
  );
  console.log("color:"+props.colour)
  console.log(gltf.scene.children)

  var x = props.colour;
  console.log("len:"+props.colour)
  if (typeof props.colour !== 'undefined')
  {
    gltf.scene.children[0].children[0].material.color['r'] = props.colour[0]
    gltf.scene.children[0].children[0].material.color['g'] = props.colour[1]
    gltf.scene.children[0].children[0].material.color['b'] = props.colour[2]
    gltf.scene.children[0].children[0].material.emissive['r'] = props.colour[3]
    gltf.scene.children[0].children[0].material.emissive['g'] = props.colour[4]
    gltf.scene.children[0].children[0].material.emissive['b'] = props.colour[5]
  }
  else
  {
    gltf.scene.children[0].children[0].material.color['r'] = 255
    gltf.scene.children[0].children[0].material.color['g'] = 255
    gltf.scene.children[0].children[0].material.color['b'] = 255
    gltf.scene.children[0].children[0].material.emissive['r'] = 0
  }

  
  return (
    <>
      <primitive object={gltf.scene} scale={0.7} dispose={null} />
    </>
  );
};

const Head = (props) => {
  const color={Green:[-4, 1, 1,0, 3, 1],Red:[-4,1, 1,3, 0, 0],Yellow:[-4, -4, 1, 3, 0, 0]}
  console.log(color[props.colorName])
  return (
    <div className='h-96 mt-4 border shadow-md'>
      <p className={'text-base shadow-2xl text-center p-2 bg-gray-200 text-gray-900'}>CT Optima 660</p>
      <Canvas camera={{ position: [20, 50, 100] }}>
        <Suspense fallback={null}>
          <mesh>
          <Model colour={color[props.colorName]}/>
          </mesh>
          <OrbitControls autoRotate autoRotateSpeed={-0.6} />
          <Environment preset="sunset" background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Head;