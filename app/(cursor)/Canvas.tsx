"use client";

import { Html, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useModelStore } from "./model";
import Hand from "./Hand";
import { useGesture } from "@/hooks/useGesture";

export default function Comp() {
  const [cursor, setCursor] = useState(false);
  const results = useModelStore((s) => s.results);

  const {
    select: { current: select },
    drag: { current: drag },
    zoom: { current: zoom },
  } = useGesture(cursor);

  const color = () => {
    if (select) return "#00ff00";
    if (drag) return "#ff0000";
    if (zoom) return "#0000ff";
    return "#ffffff";
  };

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      frameloop="demand"
      className=" !fixed left-0 top-0 z-50 h-screen w-screen "
    >
      <ambientLight intensity={5} color={"white"} />
      <Suspense fallback={<Spinner />}>
        <OrthographicCamera
          makeDefault
          position={[0, 100, -1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
        {results &&
          results.landmarks.map(
            (
              landmark: { x: number; y: number; z: number }[],
              index: number,
            ) => (
              <Hand
                landmark={landmark}
                side={results.handedness[index][0].displayName}
                color={color()}
                setCursor={setCursor}
                // ! this key (index) doesn't render two hands
                key={index}
              />
            ),
          )}
      </Suspense>
    </Canvas>
  );
}

export const Spinner = () => {
  //   const { progress } = useProgress();
  return (
    <Html as="div">
      {/* <p>{`${progress}`}</p> */}
      <VscLoading className="h-16 animate-spin" />
    </Html>
  );
};
