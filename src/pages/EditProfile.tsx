import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Profile, ProfileFormData } from '../lib/types';
import ProfileCard from '../components/ProfileCard';
import AdminEditor from '../components/AdminEditor';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditProfile() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchProfile();
        }
    }, [id]);

    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                toast.error('Failed to load profile');
                console.error(error);
                navigate('/admin/users');
                return;
            }

            setProfile(data as Profile);
        } catch (err) {
            toast.error('An unexpected error occurred');
            console.error(err);
            navigate('/admin/users');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        toast.success('Profile updated successfully!');
        navigate('/admin/users');
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
                email: profile.email || '',
                social_links: profile.social_links || [],
            };
        }

        return {
            username: '',
            full_name: '',
            age: '',
            address: '',
            contact_number: '',
            relationship_status: '',
            email: '',
            social_links: [],
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card max-w-2xl w-full">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 rounded-xl w-1/2" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.2 }}></div>
                        <div className="h-4 rounded-xl w-full" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.2 }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <ProfileCard>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/users')}
                            className="p-2 rounded-xl transition-colors hover:scale-105"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-playful font-bold" style={{ color: 'var(--color-text)' }}>
                                Edit Profile
                            </h1>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Update {profile.full_name}'s information
                            </p>
                        </div>
                    </div>
                </ProfileCard>

                {/* Profile Form */}
                <ProfileCard>
                    <AdminEditor
                        initialData={getFormData()}
                        profileId={profile.id}
                        onSave={handleSave}
                    />
                </ProfileCard>
            </div>
        </div>
    );
}
