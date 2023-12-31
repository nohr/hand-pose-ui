"use client";

import { useUIStore } from "@/app/(ui)/ui";

export default function Trigger() {
  const setMotion = useUIStore((state) => state.setMotion);
  return <input type="button" value={"click me"} onClick={setMotion} />;
}
