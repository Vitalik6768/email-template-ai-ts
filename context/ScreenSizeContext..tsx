import { createContext } from "react";



export const ScreenSizeContext = createContext<{
    screenSize: any;
  setScreenSize: (value: any) => void;
}>({
    screenSize: null,
  setScreenSize: () => {},
});