import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, defaultTheme, getTheme, applyTheme } from '../lib/themes';

interface ThemeContextType {
    theme: Theme;
    setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'itap-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Load theme from localStorage on mount
        const savedThemeId = localStorage.getItem(THEME_STORAGE_KEY);
        return savedThemeId ? getTheme(savedThemeId) : defaultTheme;
    });

    useEffect(() => {
        // Apply theme to document
        applyTheme(theme);
    }, [theme]);

    const setTheme = (themeId: string) => {
        const newTheme = getTheme(themeId);
        setThemeState(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, themeId);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
