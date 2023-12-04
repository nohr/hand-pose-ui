import { create } from "zustand";

// let time: NodeJS.Timeout | undefined;

export const useUIStore = create<UIProps>((set, get) => ({
  motion: true,
  setMotion() {
    set(() => ({ motion: !get().motion }));
  },
  status: "starting camera",
  setStatus(status: UIProps["status"]): void {
    // clearTimeout(time);
    // console.log(status);

    set(() => ({ status }));
    // if (status !== "Press space to start")
    //   time = setTimeout(() => get().setStatus(" "), 3000);
  },
  //   theme:
  //     window?.matchMedia &&
  //     window?.matchMedia("(prefers-color-scheme: dark)").matches
  //       ? "dark"
  //       : "light",
  //   setTheme(theme: UIProps["theme"]) {
  //     set(() => ({ theme }));
  //   },
}));
