import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Profile, ProfileFormData } from '../lib/types';
import ProfileCard from '../components/ProfileCard';
import AdminEditor from '../components/AdminEditor';
import CopyLinkButton from '../components/CopyLinkButton';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';

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
        if (!id) return;

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
                sex: profile.sex || '',
                disabilities: profile.disabilities || '',
                email: profile.email || '',
                theme_id: profile.theme_id || 'lavender',
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
            sex: '',
            disabilities: '',
            email: '',
            theme_id: 'lavender',
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

    const profileUrl = `${window.location.origin}/profile/${profile.username}`;

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Copy Link Section */}
                        <ProfileCard>
                            <div className="space-y-4">
                                <h2 className="text-lg font-playful font-semibold text-charcoal" style={{ color: 'var(--color-text)' }}>
                                    Profile Link
                                </h2>
                                <CopyLinkButton username={profile.username} />
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

                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <ProfileCard>
                                <div className="space-y-4 text-center">
                                    <h2 className="text-lg font-playful font-semibold text-charcoal" style={{ color: 'var(--color-text)' }}>
                                        Profile QR Code
                                    </h2>
                                    <div className="bg-white p-4 rounded-2xl shadow-inner inline-block mx-auto">
                                        <QRCodeSVG
                                            value={profileUrl}
                                            size={200}
                                            level="H"
                                            includeMargin={true}
                                        />
                                    </div>
                                    <p className="text-sm text-charcoal/60 px-4">
                                        Scan this code to instantly open the digital business card profile.
                                    </p>
                                </div>
                            </ProfileCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
