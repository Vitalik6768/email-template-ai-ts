"use client"

import { createContext } from "react"

// Need to specify the type and provide an initial value
export const DragDropElementLayout = createContext<{
  dragElementLayout: any;
  setDragElementLayout: (value: any) => void;
}>({
  dragElementLayout: null,
  setDragElementLayout: () => {},
});