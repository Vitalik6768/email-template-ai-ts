import { createContext } from "react";



export const SelectedElementContext = createContext<{
    selectedElement: any;
  setSelectedElement: (value: any) => void;
}>({
    selectedElement: null,
  setSelectedElement: () => {},
});
