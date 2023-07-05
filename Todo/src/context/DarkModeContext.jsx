import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const DarkModeContext = createContext();

//내부적으로 상관없이 dakemode를 사용
export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(/* (prev) => !prev */ !darkMode);
    //기존에있던 다크모드가 반대로 라이트모드로 업데이트(변경)
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  return (
    <DarkModeContext.Provider value={{ darkMode: darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//다크모드인지아닌지 boolean으로
function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}