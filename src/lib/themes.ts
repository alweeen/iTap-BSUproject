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
            cardBg: '#ffffff',
            cardBgOpacity: 0.7,
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
            cardBg: '#ffffff',
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
            cardBg: '#ffffff',
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
            background: '#F1F8E9',
            cardBg: '#ffffff',
            cardBgOpacity: 0.7,
            primary: '#8BC34A',
            secondary: '#558B2F',
            accent: '#9CCC65',
            text: '#1B5E20',
            textSecondary: '#1B5E2099',
        },
    },
    rose: {
        id: 'rose',
        name: 'Rose Garden',
        colors: {
            background: '#FCE4EC',
            cardBg: '#ffffff',
            cardBgOpacity: 0.7,
            primary: '#F48FB1',
            secondary: '#C2185B',
            accent: '#F06292',
            text: '#4A148C',
            textSecondary: '#4A148C99',
        },
    },
    midnight: {
        id: 'midnight',
        name: 'Midnight Sky',
        colors: {
            background: '#1A237E',
            cardBg: '#283593',
            cardBgOpacity: 0.8,
            primary: '#7C4DFF',
            secondary: '#651FFF',
            accent: '#B388FF',
            text: '#E8EAF6',
            textSecondary: '#E8EAF699',
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
