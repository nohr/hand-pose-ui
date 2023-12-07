"use client";

import React, { useEffect, useRef } from "react";
import { Stage, useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Vector3 } from "three";

useGLTF.preload("/models/Cartoon+hands.gltf");

// cursor props
type HandProps = {
  landmark: { x: number; y: number; z: number }[];
  side: string;
  color: string;
  setCursor: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Hand({ landmark, side, color, setCursor }: HandProps) {
  useEffect(() => {
    return () => {
      setCursor(false);
    };
  }, [setCursor]);

  const { nodes } = useGLTF("/models/Cartoon+hands.gltf") as unknown as GLTF & {
    nodes: {
      point_left: THREE.Mesh;
      point_right: THREE.Mesh;
    };
  };

  const material = new MeshStandardMaterial({
    flatShading: true,
    color: color,
    roughness: 0.5,
    metalness: 0.5,
  });

  // * handle rotation
  const offsetX = Math.floor(window.innerWidth * landmark[8].x);

  const offsetY = Math.floor(window.innerHeight * landmark[8].y);

  const index_tip = landmark[8];
  const wrist = landmark[0];

  // * handle position
  const { viewport } = useThree();

  // Normalize offsetX
  const offsetXNormalized =
    window.innerWidth * landmark[8].x - viewport.width / 2;
  const offsetYNormalized =
    window.innerHeight * landmark[8].y - viewport.height / 2;

  //   console.log(offsetXNormalized, offsetYNormalized);

  // get the angle of the line from the tip to the wrist base
  const y_angle = Math.atan2(index_tip.y - wrist.y, index_tip.x - wrist.x) * -1;
  //   console.log(angle);

  // ? this angle is inverted
  //   get the z angle of the line from the tip to the wrist base
  const x_angle = Math.atan2(index_tip.z - wrist.z, index_tip.x - wrist.x);
  //   console.log(x_angle);

  const handRef = useRef<Mesh>(null!);

  useFrame(({}) => {
    if (handRef.current) {
      handRef.current.position.lerp(
        new Vector3(offsetXNormalized, 0, -offsetYNormalized),
        0.8,
      );
    }
  });

  return (
    <mesh
      ref={handRef}
      castShadow
      receiveShadow
      dispose={null}
      frustumCulled={false}
      onAfterRender={() => setCursor(true)}
      geometry={
        side === "Right"
          ? nodes.point_right.geometry
          : nodes.point_left.geometry
      }
      material={material}
      //   ? Euler order: ?Z? because camera is top down
      //   rotation={[0, y_angle, 0]}
      //   position={[offsetXNormalized, 0, -offsetYNormalized]}
    />
  );
}
