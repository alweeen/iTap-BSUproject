import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Profile } from '../lib/types';
import ProfileCard from '../components/ProfileCard';
import ProfileListCard from '../components/ProfileListCard';
import { Plus, Users, Search, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserManagement() {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            navigate('/admin/login');
            return;
        }

        fetchProfiles();
    };

    const fetchProfiles = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching profiles:', error);
                toast.error('Failed to load profiles');
                return;
            }

            setProfiles(data as Profile[]);
        } catch (err) {
            console.error('Unexpected error:', err);
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', id);

            if (error) {
                toast.error('Failed to delete profile');
                console.error(error);
                return;
            }

            toast.success('Profile deleted successfully');
            fetchProfiles();
        } catch (err) {
            toast.error('An unexpected error occurred');
            console.error(err);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    const filteredProfiles = profiles.filter(profile =>
        profile.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card max-w-2xl w-full">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 rounded-xl w-1/2" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.2 }}></div>
                        <div className="h-4 rounded-xl w-full" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.2 }}></div>
                        <div className="h-4 rounded-xl w-full" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.2 }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <ProfileCard>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                                style={{ background: `linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))` }}
                            >
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-playful font-bold" style={{ color: 'var(--color-text)' }}>
                                    User Management
                                </h1>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Manage all digital business card profiles
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate('/admin/dashboard')}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Back to Dashboard
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                </ProfileCard>

                {/* Search and Create */}
                <ProfileCard>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                style={{ color: 'var(--color-text-secondary)' }}
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search profiles..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
                                style={{
                                    borderColor: 'var(--color-accent)',
                                    backgroundColor: 'var(--color-card-bg)',
                                    color: 'var(--color-text)',
                                    opacity: 0.5,
                                }}
                            />
                        </div>
                        <button
                            onClick={() => navigate('/admin/users/create')}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                       font-medium transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md"
                            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)' }}
                        >
                            <Plus className="w-5 h-5" />
                            Create New Profile
                        </button>
                    </div>
                </ProfileCard>

                {/* Profile Count */}
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Showing {filteredProfiles.length} of {profiles.length} profiles
                </div>

                {/* Profiles Grid */}
                {filteredProfiles.length === 0 ? (
                    <ProfileCard>
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-accent)', opacity: 0.5 }} />
                            <h3 className="text-xl font-playful font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                                {searchQuery ? 'No profiles found' : 'No profiles yet'}
                            </h3>
                            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                {searchQuery ? 'Try a different search term' : 'Create your first digital business card profile'}
                            </p>
                            {!searchQuery && (
                                <button
                                    onClick={() => navigate('/admin/users/create')}
                                    className="btn-primary"
                                >
                                    Create Profile
                                </button>
                            )}
                        </div>
                    </ProfileCard>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProfiles.map((profile) => (
                            <ProfileListCard
                                key={profile.id}
                                profile={profile}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
