import { SocialLink } from '../lib/types';
import {
    Instagram,
    Linkedin,
    Twitter,
    Github,
    Facebook,
    Youtube,
    Globe,
    Mail
} from 'lucide-react';

interface SocialLinksProps {
    links: SocialLink[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
    if (!links || links.length === 0) return null;

    const getIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p.includes('github')) return <Github className="w-5 h-5" />;
        if (p.includes('twitter')) return <Twitter className="w-5 h-5" />;
        if (p.includes('linkedin')) return <Linkedin className="w-5 h-5" />;
        if (p.includes('instagram')) return <Instagram className="w-5 h-5" />;
        if (p.includes('facebook')) return <Facebook className="w-5 h-5" />;
        if (p.includes('youtube')) return <Youtube className="w-5 h-5" />;
        if (p.includes('email') || p.includes('mail')) return <Mail className="w-5 h-5" />;
        return <Globe className="w-5 h-5" />;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 
                             hover:scale-105 active:scale-95 shadow-md group border-2"
                    style={{
                        backgroundColor: 'var(--color-card-bg)',
                        borderColor: 'var(--color-primary)',
                        color: 'var(--color-text)'
                    }}
                >
                    <div className="p-2 rounded-full transition-colors"
                        style={{ backgroundColor: 'var(--color-background)' }}
                    >
                        {/* We can use a clone or wrapper to style the icon color if needed, 
                             but lucide icons inherit currentColor usually, or we set standard color */}
                        <span style={{ color: 'var(--color-accent)' }}>
                            {getIcon(link.platform)}
                        </span>
                    </div>
                    <span className="font-medium">{link.platform}</span>
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;
