import { Profile } from '../lib/types';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileListCardProps {
    profile: Profile;
    onDelete: (id: string) => void;
}

export default function ProfileListCard({ profile, onDelete }: ProfileListCardProps) {
    const navigate = useNavigate();

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
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                >
                    <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                        {profile.full_name.charAt(0).toUpperCase()}
                    </span>
                </div>
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
                <a
                    href={`/profile/${profile.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl 
                   transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                >
                    <ExternalLink className="w-4 h-4" />
                    View
                </a>
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
