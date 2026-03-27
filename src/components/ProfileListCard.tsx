import { Profile } from '../lib/types';
import { Edit, Trash2, ExternalLink, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ProfileListCardProps {
    profile: Profile;
    onDelete: (id: string) => void;
}

export default function ProfileListCard({ profile, onDelete }: ProfileListCardProps) {
    const navigate = useNavigate();

    const [copied, setCopied] = useState(false);
    const profileUrl = `${window.location.origin}/profile/${profile.username}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            toast.success('Profile link copied!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the profile for "${profile.full_name}"?`)) {
            onDelete(profile.id);
        }
    };

    return (
        <div className="glass-card">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-playful font-semibold" style={{ color: 'var(--color-text)' }}>
                        {profile.full_name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        @{profile.username}
                    </p>
                </div>
                <a
                    href={`/profile/${profile.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                    style={{ color: 'var(--color-text)' }}
                    title="View Profile"
                >
                    <ExternalLink className="w-5 h-5" />
                </a>
            </div>

            {profile.email && (
                <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {profile.email}
                </p>
            )}

            {profile.contact_number && (
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {profile.contact_number}
                </p>
            )}

            <div className="flex gap-2">
                <button
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl 
                   transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)' }}
                    title="Copy Profile Link"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                    onClick={() => navigate(`/admin/users/${profile.id}/edit`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl 
                   transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)' }}
                >
                    <Edit className="w-4 h-4" />
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: '#ef4444', color: 'white' }}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
