"use client";

import { create } from "zustand";
import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { useUIStore } from "../(ui)/ui";

interface ModelProps {
  /**
   * The Hands model instance.
   * @type {HandLandmarker}
   * @see https://google.github.io/mediapipe/solutions/hands#javascript-solution-api
   *
   */
  hands: HandLandmarker | null;
  init_hands: () => void;
  /**
   * The hand model results instance.
   * @type {Results}
   * @see {@link @mediapipe/hands/index.d.ts}
   */
  results: HandLandmarkerResult | null;
  selfie: boolean;
  input: HTMLVideoElement | null;
  start_input: () => void;
  stop_input: () => void;
  stage?: number;
}

export const useModelStore = create<ModelProps>()((set, get) => ({
  hands: null,
  init_hands() {
    (async () => {
      useUIStore.getState().setStatus("loading hands landmarker");
      const vision = await FilesetResolver.forVisionTasks(
        // path/to/wasm/root
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
      );
      const hands = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "hand_landmarker.task",
          delegate: "GPU",
        },
        numHands: 2,
        minHandDetectionConfidence: 0.9,
        minTrackingConfidence: 0.9,
      });
      await hands.setOptions({ runningMode: "VIDEO" });
      useUIStore.getState().setStatus("hands landmarker loaded");
      set({ hands });
    })();
  },
  results: null,
  selfie: true,
  input: null,
  start_input() {
    const video = get().input as HTMLVideoElement;
    if (video && video.srcObject) {
      (video.srcObject as MediaStream).getVideoTracks()[0].enabled = true;
      video.requestPictureInPicture().catch(() => {});
    }

    if (
      navigator &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    )
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: 1280,
            height: 720,
            facingMode: `${get().selfie ? "user" : "environment"}`,
          },
        })
        .then((stream) => {
          const video = get().input as HTMLVideoElement;
          if (video) {
            video.srcObject = stream;
            video.requestPictureInPicture().catch(() => {});
            useUIStore.getState().setStatus("camera started");
          }
        })
        .catch((err) => console.log(err));
  },
  stop_input() {
    const video = get().input as HTMLVideoElement;
    if (video && video.srcObject) {
      (video.srcObject as MediaStream).getVideoTracks()[0].stop();
      video.pause();
    }
  },
}));
