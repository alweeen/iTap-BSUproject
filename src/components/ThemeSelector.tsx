import { themes } from '../lib/themes';
import { useTheme } from '../contexts/ThemeContext';
import { Check, Palette } from 'lucide-react';

interface ThemeSelectorProps {
    selectedThemeId?: string;
    onSelect?: (themeId: string) => void;
}

export default function ThemeSelector({ selectedThemeId, onSelect }: ThemeSelectorProps = {}) {
    const { theme: contextTheme, setTheme: setContextTheme } = useTheme();

    // If props are provided, use them (controlled mode). Otherwise use context.
    const currentThemeId = selectedThemeId || contextTheme.id;

    const handleSelect = (id: string) => {
        if (onSelect) {
            onSelect(id);
        } else {
            setContextTheme(id);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Palette className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-lg font-playful font-semibold" style={{ color: 'var(--color-text)' }}>
                    Choose Your Theme
                </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.values(themes).map((theme) => (
                    <button
                        key={theme.id}
                        type="button" // Important for forms
                        onClick={() => handleSelect(theme.id)}
                        className="relative p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                            backgroundColor: theme.colors.cardBg,
                            borderColor: currentThemeId === theme.id ? theme.colors.primary : 'transparent',
                            opacity: theme.colors.cardBgOpacity,
                        }}
                    >
                        {/* Color Preview */}
                        <div className="flex gap-1 mb-3">
                            <div
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: theme.colors.background }}
                            />
                            <div
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: theme.colors.primary }}
                            />
                            <div
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: theme.colors.secondary }}
                            />
                        </div>

                        {/* Theme Name */}
                        <p
                            className="text-sm font-medium text-center"
                            style={{ color: theme.colors.text }}
                        >
                            {theme.name}
                        </p>

                        {/* Active Indicator */}
                        {currentThemeId === theme.id && (
                            <div
                                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: theme.colors.primary }}
                            >
                                <Check className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
