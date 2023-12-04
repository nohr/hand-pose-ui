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
  /**
   * The results handler.
   * @type {(results: Results) => void}
   */
  handleResults: () => void;
  selfie: boolean;
  setSelfie: () => void;
  input: HTMLVideoElement | null;
  canvas: HTMLCanvasElement | null;
  get_canvas: (canvas: HTMLCanvasElement) => void;
  start_input: () => void;
  stop_input: () => void;
  stage?: number;
}

export const useModelStore = create<ModelProps>()((set, get) => ({
  hands: null,
  init_hands() {
    useUIStore.getState().setStatus("loading hands landmarker");
    (async () => {
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
        minHandDetectionConfidence: 0.95,
        minTrackingConfidence: 0.95,
      });

      await hands.setOptions({ runningMode: "VIDEO" });

      useUIStore.getState().setStatus("hands landmarker loaded");

      set({ hands });
    })();
  },
  results: null,
  handleResults() {
    let lastVideoTime = -1;
    const renderLoop = (): void => {
      const video = get().input as HTMLVideoElement;
      console.log("hello", video);

      if (video.currentTime !== lastVideoTime) {
        const results = get().hands!.detectForVideo(video, lastVideoTime);
        set({ results });
        lastVideoTime = video.currentTime;
      }

      requestAnimationFrame(() => {
        renderLoop();
      });
    };
  },
  selfie: true,
  setSelfie() {
    set((state) => ({ selfie: !state.selfie }));
  },
  input: null,
  canvas: null,
  get_canvas(canvas) {
    set({ canvas });
  },
  start_input() {
    if (get().input?.srcObject) {
      (get().input?.srcObject as MediaStream).getVideoTracks()[0].enabled =
        true;
      (get().input as HTMLVideoElement)
        .requestPictureInPicture()
        .catch(() => {});
    }
    navigator.mediaDevices
      ?.getUserMedia({
        audio: false,
        video: {
          width: 1280,
          height: 720,
          facingMode: `${get().selfie ? "user" : "environment"}`,
        },
      })
      .then((stream) => {
        (get().input as HTMLVideoElement).srcObject = stream;

        (get().input as HTMLVideoElement)
          .requestPictureInPicture()
          .catch(() => {});

        useUIStore.getState().setStatus("camera started");
      })
      .catch((err) => console.log(err));
  },
  stop_input() {
    (get().input?.srcObject as MediaStream)?.getVideoTracks()[0].stop();
    useUIStore.getState().setStatus("lost focus");
  },
}));
