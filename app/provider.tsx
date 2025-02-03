"use client"

import { DragDropElementLayout } from '@/context/DragDropElementLayout';
import { EmailTemplateContext } from '@/context/EmailTemplateContext';
import { ScreenSizeContext } from '@/context/ScreenSizeContext.';
import { SelectedElementContext } from '@/context/SelectedElementContext';
import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
// import { UserDetailContext } from '../context/UserDetailContext';

function Provider({ children }: { children: React.ReactNode }) {
    const [userDetail, setUserDetail] = useState<any>(null);
    const [screenSize, setScreenSize] = useState<string>('desktop');
    const [dragElementLayout, setDragElementLayout] = useState<any>(null);
    const [emailTemplate, setEmailTemplate] = useState<any>(null);
    const [selectedElement, setSelectedElement] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                setUserDetail(JSON.parse(userInfo));
            } else {
                setUserDetail(null);
            }
        }
    }, []);

    return (
        // <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
                <DragDropElementLayout.Provider value={{ dragElementLayout, setDragElementLayout }}>
                    <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
                        <SelectedElementContext.Provider value={{ selectedElement, setSelectedElement }}>
                            {children}
                        </SelectedElementContext.Provider>
                    </EmailTemplateContext.Provider>
                </DragDropElementLayout.Provider>
             </ScreenSizeContext.Provider>
        // </UserDetailContext.Provider>
    );
}

export default Provider;

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
}

export const useDragElementLayout = () => {
  return useContext(DragDropElementLayout);
}

export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext);
}

export const useSelectedElement = () => {
  return useContext(SelectedElementContext);
}
