"use client"

import { createContext } from "react"

// export const EmailTemplateContext = createContext()



export const EmailTemplateContext = createContext<{
    emailTemplate: any;
    setEmailTemplate: (value: any) => void;
}>({
    emailTemplate: null,
    setEmailTemplate: () => {},
});