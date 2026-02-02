import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ProfileFormData } from '../lib/types';
import ProfileCard from '../components/ProfileCard';
import AdminEditor from '../components/AdminEditor';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateProfile() {
    const navigate = useNavigate();
    const [creating, setCreating] = useState(false);

    const initialData: ProfileFormData = {
        username: '',
        full_name: '',
        age: '',
        address: '',
        contact_number: '',
        relationship_status: '',
        email: '',
        theme_id: 'lavender',
        social_links: [],
    };

    const handleCreate = async (formData?: ProfileFormData) => {
        if (!formData) return;

        setCreating(true);

        try {
            // Check if username already exists
            const { data: existing } = await supabase
                .from('profiles')
                .select('username')
                .eq('username', formData.username)
                .single();

            if (existing) {
                toast.error('Username already exists. Please choose a different one.');
                setCreating(false);
                return;
            }

            // Create new profile
            const { error } = await supabase
                .from('profiles')
                .insert({
                    username: formData.username,
                    full_name: formData.full_name,
                    age: formData.age ? parseInt(formData.age) : null,
                    address: formData.address || null,
                    contact_number: formData.contact_number || null,
                    relationship_status: formData.relationship_status || null,
                    email: formData.email || null,
                    theme_id: formData.theme_id || 'lavender',
                    social_links: formData.social_links.filter(
                        link => link.platform.trim() && link.url.trim()
                    ),
                });

            if (error) {
                toast.error('Failed to create profile');
                console.error(error);
                return;
            }

            toast.success('Profile created successfully!');
            navigate('/admin/users');
        } catch (err) {
            toast.error('An unexpected error occurred');
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

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
                                Create New Profile
                            </h1>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Add a new digital business card
                            </p>
                        </div>
                    </div>
                </ProfileCard>

                {/* Profile Form */}
                <ProfileCard>
                    <AdminEditor
                        initialData={initialData}
                        profileId=""
                        onSave={handleCreate}
                        isCreating={true}
                    />
                </ProfileCard>
            </div>
        </div>
    );
}
