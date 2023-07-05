import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();


export function DrakModeProvider({children}) {
    const [darkmode, setDarkMode] = useState(false);
    const toggleDarkMode = () =>{
        setDarkMode(!darkmode);
        updateDarkMode(!darkmode)
        // 다크모드였던 반대로지정 (라이트모드)
    }
    useEffect(()=>{
    const isDark =
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && 
    window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark);
    updateDarkMode(isDark);
    }, [])
    return (
    <DarkModeContext.Provider value={{darkmode,toggleDarkMode}}>
        {children}
    </DarkModeContext.Provider>
    );
}

function updateDarkMode (darkmode) {
    if(darkmode){
        document.documentElement.classList.add('dark');
        localStorage.theme='dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme='light';
    }
}
export const useDarkMode = () => useContext(DarkModeContext);