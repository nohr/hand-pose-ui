import { useFrame } from "@react-three/fiber";
import { useModelStore } from "./model";

export default function RenderLoop() {
  const [input, hands] = useModelStore((s) => [s.input, s.hands]);

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

  useFrame(() => {
    if (!input) return;
    renderLoop();
  });

  return <></>;
}
