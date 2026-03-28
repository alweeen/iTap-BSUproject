import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Profile, ProfileFormData } from '../lib/types';
import ProfileCard from '../components/ProfileCard';
import AdminEditor from '../components/AdminEditor';
import CopyLinkButton from '../components/CopyLinkButton';
import { LogOut, User, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const { setTheme } = useTheme();

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (profile === null && !loading) {
            fetchProfile();
        }
    }, [refreshKey]);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            navigate('/admin/login');
            return;
        }

        fetchProfile();
    };

    const fetchProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/admin/login');
                return;
            }

            // Try to fetch existing profile
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
                toast.error('Failed to load profile');
                return;
            }

            if (data) {
                const profileData = data as Profile;
                setProfile(profileData);
                // Sync dashboard theme with profile theme
                if (profileData.theme_id) {
                    setTheme(profileData.theme_id);
                }
            } else {
                // No profile exists, show empty form
                setProfile(null);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    const handleSave = () => {
        setRefreshKey(prev => prev + 1);
        fetchProfile();
    };

    const getFormData = (): ProfileFormData => {
        if (profile) {
            return {
                username: profile.username,
                full_name: profile.full_name,
                age: profile.age?.toString() || '',
                address: profile.address || '',
                contact_number: profile.contact_number || '',
                relationship_status: profile.relationship_status || '',
                sex: profile.sex || '',
                disabilities: profile.disabilities || '',
                email: profile.email || '',
                social_links: profile.social_links || [],
                theme_id: profile.theme_id || 'lavender',
            };
        }

        return {
            username: '',
            full_name: '',
            age: '',
            address: '',
            contact_number: '',
            relationship_status: '',
            sex: '',
            disabilities: '',
            email: '',
            social_links: [],
            theme_id: 'lavender',
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card max-w-2xl w-full">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-sage/20 rounded-xl w-1/2"></div>
                        <div className="h-4 bg-sage/20 rounded-xl w-full"></div>
                        <div className="h-4 bg-sage/20 rounded-xl w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 bg-background text-text transition-colors duration-300">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <ProfileCard>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full 
                            flex items-center justify-center shadow-lg text-white">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-playful font-bold text-text">
                                    Admin Dashboard
                                </h1>
                                <p className="text-text-secondary text-sm">
                                    Manage your digital business card
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate('/admin/users')}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                                style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                            >
                                <User className="w-5 h-5" />
                                Manage Users
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-text-secondary hover:text-text"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                </ProfileCard>

                {/* NFC Link Section */}
                {profile && (
                    <ProfileCard>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-playful font-semibold text-text">
                                    NFC Link Management
                                </h2>
                                <a
                                    href={`/profile/${profile.username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-accent hover:opacity-80 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View Profile
                                </a>
                            </div>
                            <CopyLinkButton username={profile.username} />
                        </div>
                    </ProfileCard>
                )}

                {/* Profile Editor */}
                <ProfileCard>
                    <h2 className="text-xl font-playful font-semibold text-text mb-6">
                        {profile ? 'Edit Profile' : 'Create Profile'}
                    </h2>
                    <AdminEditor
                        initialData={getFormData()}
                        profileId={profile?.id || ''}
                        onSave={handleSave}
                    />
                </ProfileCard>
            </div>
        </div>
    );
}
