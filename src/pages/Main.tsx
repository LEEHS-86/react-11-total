import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "../components/Header";
import GlobalStyle from "../GlobalStyles/GlobalStyle";
import { lightTheme, darkTheme } from "../GlobalStyles/theme";

function Main() {
    const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };
    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Header isDark={isDark} onToggle={toggleTheme} />
            <main>
                <Outlet />
            </main>
        </ThemeProvider>
    );
}

export default Main;
