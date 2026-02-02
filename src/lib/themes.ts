export interface Theme {
    id: string;
    name: string;
    colors: {
        background: string;
        cardBg: string;
        cardBgOpacity: number;
        primary: string;
        secondary: string;
        accent: string;
        text: string;
        textSecondary: string;
    };
}

export const themes: Record<string, Theme> = {
    lavender: {
        id: 'lavender',
        name: 'Lavender Dream',
        colors: {
            background: '#E6E6FA',
            cardBg: 'rgba(255, 255, 255, 0.7)',
            cardBgOpacity: 0.7, // Kept for backward compat if needed, but unused in css
            primary: '#98FF98',
            secondary: '#9DC183',
            accent: '#9DC183',
            text: '#36454F',
            textSecondary: '#36454F99',
        },
    },
    ocean: {
        id: 'ocean',
        name: 'Ocean Breeze',
        colors: {
            background: '#E0F7FA',
            cardBg: 'rgba(255, 255, 255, 0.7)',
            cardBgOpacity: 0.7,
            primary: '#4DD0E1',
            secondary: '#0097A7',
            accent: '#00BCD4',
            text: '#263238',
            textSecondary: '#26323899',
        },
    },
    sunset: {
        id: 'sunset',
        name: 'Sunset Glow',
        colors: {
            background: '#FFF3E0',
            cardBg: 'rgba(255, 255, 255, 0.7)',
            cardBgOpacity: 0.7,
            primary: '#FF9800',
            secondary: '#FF6F00',
            accent: '#FFB74D',
            text: '#3E2723',
            textSecondary: '#3E272399',
        },
    },
    forest: {
        id: 'forest',
        name: 'Forest Calm',
        colors: {
            background: '#E8F5E9',
            cardBg: 'rgba(255, 255, 255, 0.8)',
            cardBgOpacity: 0.8,
            primary: '#66BB6A',
            secondary: '#81C784',
            accent: '#2E7D32',
            text: '#1B5E20',
            textSecondary: '#1B5E2099',
        },
    },
    rose: {
        id: 'rose',
        name: 'Rose Garden',
        colors: {
            background: '#FFF0F5',
            cardBg: 'rgba(255, 255, 255, 0.7)',
            cardBgOpacity: 0.7,
            primary: '#FFB7C5',
            secondary: '#FFC0CB',
            accent: '#DB7093',
            text: '#4B3621',
            textSecondary: '#4B362199',
        },
    },
    midnight: {
        id: 'midnight',
        name: 'Midnight Sky',
        colors: {
            background: '#191970',
            cardBg: 'rgba(255, 255, 255, 0.1)', // Light glass effect on dark bg
            cardBgOpacity: 0.1,
            primary: '#9370DB',
            secondary: '#8A2BE2',
            accent: '#E6E6FA',
            text: '#FFFFFF',
            textSecondary: '#E0E0E0',
        },
    },
};

export const defaultTheme = themes.lavender;

export function getTheme(themeId: string): Theme {
    return themes[themeId] || defaultTheme;
}

export function applyTheme(theme: Theme): void {
    const root = document.documentElement;

    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-card-bg', theme.colors.cardBg);
    root.style.setProperty('--color-card-bg-opacity', theme.colors.cardBgOpacity.toString());
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
}
