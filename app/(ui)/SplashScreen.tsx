// import { useEffect } from "react";
import { VscLoading } from "react-icons/vsc";
import { useUIStore } from "@/app/(ui)/ui";
import Fade from "./index";
// import { useModelStore } from "../(cursor)/model";

export function SplashScreen() {
  const status = useUIStore((state) => state.status);
  // const setStatus = useUIStore((state) => state.setStatus);
  // const input = useModelStore((state) => state.input);
  // const canvas = useModelStore((state) => state.canvas);
  // const results = useModelStore((state) => state.results);
  // // every time the status changes, append the old status to the component

  // // subscribe to the results for Loading
  // useEffect(() => {
  //   if (!input) setStatus("loading camera");
  //   if (input && !canvas) setStatus("loading canvas");
  //   // else if (!results) setStatus("loading model");
  // }, [input, canvas, results, setStatus]);

  return (
    <Fade truthy={status !== ""}>
      <div
        className={`fixed flex h-screen w-screen items-center bg-current p-4`}
      >
        <div className=" inline-flex gap-x-2 text-white dark:text-black">
          <VscLoading className="h-6 animate-spin" />
          {status}
        </div>
      </div>
    </Fade>
  );
}
