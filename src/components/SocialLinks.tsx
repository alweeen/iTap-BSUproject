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

export default function SocialLinks({ links }: SocialLinksProps) {
    const getIcon = (platform: string) => {
        const platformLower = platform.toLowerCase();

        if (platformLower.includes('instagram')) return <Instagram className="w-5 h-5" />;
        if (platformLower.includes('linkedin')) return <Linkedin className="w-5 h-5" />;
        if (platformLower.includes('twitter') || platformLower.includes('x.com')) return <Twitter className="w-5 h-5" />;
        if (platformLower.includes('github')) return <Github className="w-5 h-5" />;
        if (platformLower.includes('facebook')) return <Facebook className="w-5 h-5" />;
        if (platformLower.includes('youtube')) return <Youtube className="w-5 h-5" />;
        if (platformLower.includes('email') || platformLower.includes('mail')) return <Mail className="w-5 h-5" />;

        return <Globe className="w-5 h-5" />;
    };

    if (!links || links.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-3">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-sage/20 text-charcoal px-4 py-2 rounded-xl 
                     transition-all duration-200 hover:bg-sage/30 hover:scale-105 active:scale-95"
                    title={link.platform}
                >
                    {getIcon(link.platform)}
                    <span className="text-sm font-medium">{link.platform}</span>
                </a>
            ))}
        </div>
    );
}
