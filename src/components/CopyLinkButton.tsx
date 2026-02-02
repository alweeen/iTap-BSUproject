import toast from 'react-hot-toast';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CopyLinkButtonProps {
    username: string;
}

export default function CopyLinkButton({ username }: CopyLinkButtonProps) {
    const [copied, setCopied] = useState(false);
    const profileUrl = `${import.meta.env.VITE_APP_URL}/profile/${username}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            toast.success('Profile link copied to clipboard!');

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-charcoal">
                Your Profile Link (for NFC)
            </label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={profileUrl}
                    readOnly
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-sage/20 
                   bg-white/50 text-charcoal font-mono text-sm"
                />
                <button
                    onClick={handleCopy}
                    className="btn-primary flex items-center gap-2 whitespace-nowrap"
                >
                    {copied ? (
                        <>
                            <Check className="w-5 h-5" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-5 h-5" />
                            Copy Link
                        </>
                    )}
                </button>
            </div>
            <p className="text-xs text-charcoal/60">
                Write this URL to your NFC sticker to share your digital business card instantly!
            </p>
        </div>
    );
}
