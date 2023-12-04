"use client";

import { useEffect, useRef, useState } from "react";
import { useModelStore } from "@/app/(cursor)/model";
import { useUIStore } from "@/app/(ui)/ui";

export default function Camera() {
  const [start_input, stop_input, selfie, input, hands] = useModelStore(
    (state) => [
      state.start_input,
      state.stop_input,
      state.selfie,
      state.input,
      state.hands,
    ],
  );
  const [motion] = useUIStore((state) => [state.motion]);

  useEffect(() => {
    useModelStore.setState({
      input: document.querySelector("video.input_video") as HTMLVideoElement,
    });
  }, []);

  // handle focus and blur events
  useEffect(() => {
    if (!motion) return;
    window.addEventListener("focus", start_input);
    window.addEventListener("blur", stop_input);
    return () => {
      window.removeEventListener("focus", start_input);
      window.removeEventListener("blur", stop_input);
    };
  }, [motion, start_input, stop_input]);

  let lastVideoTime = -1;
  function renderLoop(): void {
    if (input && hands && input.currentTime !== lastVideoTime) {
      lastVideoTime = input.currentTime;
      const results = hands.detectForVideo(input, lastVideoTime);
      console.log(results);

      // useModelStore.setState({
      //   results: hands.detectForVideo(input, lastVideoTime),
      // });
    }
  }

  useEffect(() => {
    if (!motion) return;
    const interval = setInterval(() => {
      renderLoop();
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [motion]);

  return (
    <>
      <video
        autoPlay
        onTimeUpdate={() => {
          renderLoop();
        }}
        width="1280"
        height="720"
        className={`input_video absolute top-0 -z-10 hidden  h-full w-full border-[1px] border-red-500 opacity-0 ${
          !selfie ? "-scale-x-100" : " scale-x-100"
        } `}
      ></video>
    </>
  );
}
