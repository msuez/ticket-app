import React, { createContext, useState } from 'react';

export const UiContext = createContext();

export const UiProvider = ({ children }) => {

    const [ menuHidden, setMenuHidden ] = useState(true);

    const showMenu = () => {
        setMenuHidden(false);
    }

    const hideMenu = () => {
        setMenuHidden(true);
    }

    return (
        <UiContext.Provider value={{
            menuHidden,
            showMenu,
            hideMenu,
        }}>
            { children }
        </UiContext.Provider>
    )
}
