"use client";

import { useEffect } from "react";
import { useModelStore } from "@/app/(cursor)/model";

export default function Camera() {
  const [start_input, stop_input, input, hands] = useModelStore((s) => [
    s.start_input,
    s.stop_input,
    s.input,
    s.hands,
  ]);
  // const [motion] = useUIStore((s) => [s.motion]);

  useEffect(() => {
    if (!input)
      useModelStore.setState({
        input: document.querySelector("video.input_video") as HTMLVideoElement,
      });
  }, [input]);

  // handle focus and blur events
  // !fixme: hands model needs to be disposed before the video element is removed
  // useEffect(() => {
  //   window.addEventListener("focus", start_input);
  //   window.addEventListener("blur", stop_input);
  //   return () => {
  //     window.removeEventListener("focus", start_input);
  //     window.removeEventListener("blur", stop_input);
  //   };
  // }, [start_input, stop_input]);

  let lastVideoTime = -1;
  function renderLoop(): void {
    if (input && hands && input.currentTime !== lastVideoTime) {
      lastVideoTime = input.currentTime;
      const results = hands.detectForVideo(input, lastVideoTime);
      useModelStore.setState({
        results,
      });
    }
  }

  return (
    <video
      autoPlay
      onTimeUpdate={() => {
        renderLoop();
      }}
      width="1280"
      height="720"
      className={`input_video absolute top-0 -z-10 flex  h-full w-full -scale-x-100 border-[1px] border-red-500 opacity-0`}
    ></video>
  );
}
