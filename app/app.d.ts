// zustand state props

interface UIProps {
  motion: boolean;
  setMotion: () => void;
  status: string | JSX.Element;
  /**
   * Sets the status message in the menu.
   *
   * @param status The status message which may be a string or JSX.Element.
   */
  setStatus: (status: string | JSX.Element) => void;
  //   theme: "light" | "dark";
  //   setTheme: (theme: "light" | "dark") => void;
}

// cursor props
type HandProps = {
  hand: { x: number; y: number; z: number }[];
  side: string;
  drag: boolean;
  select: boolean;
  zoom: boolean;
  setCursor: React.Dispatch<React.SetStateAction<boolean>>;
};
