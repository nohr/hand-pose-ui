"use client";

import React, { useEffect } from "react";
import { useModelStore } from "@/app/(cursor)/model";
import { useUIStore } from "../(ui)/ui";
import Camera from "./Camera";
import Canvas from "./Canvas";
// import ResultsDebug from "./ResultsDebug";

export default function Cursor() {
  const [input, start_input, hands, init_hands, results] = useModelStore(
    (s) => [s.input, s.start_input, s.hands, s.init_hands, s.results],
  );
  const setStatus = useUIStore((s) => s.setStatus);

  // Handle the model functions
  useEffect(() => {
    if (!input) return;
    start_input();
  }, [input, start_input]);

  useEffect(() => {
    if (!results) return;
    setStatus("");
  }, [results, setStatus]);

  useEffect(() => {
    if (!input || hands) return;
    init_hands();
  }, [init_hands, hands, input]);

  return (
    <>
      {/* <ResultsDebug /> */}
      <Camera />
      <Canvas />
    </>
  );
}
