import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Profile } from '../lib/types';
import ProfileCard from '../components/ProfileCard';
import SocialLinks from '../components/SocialLinks';
import { User, MapPin, Phone, Mail, Heart, Cake } from 'lucide-react';

export default function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            if (!username) {
                setError('No username provided');
                setLoading(false);
                return;
            }

            try {
                const { data, error: fetchError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('username', username)
                    .single();

                if (fetchError) {
                    if (fetchError.code === 'PGRST116') {
                        setError('Profile not found');
                    } else {
                        setError('Failed to load profile');
                    }
                    setLoading(false);
                    return;
                }

                setProfile(data as Profile);
            } catch (err) {
                setError('An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card max-w-md w-full">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-sage/20 rounded-xl w-3/4"></div>
                        <div className="h-4 bg-sage/20 rounded-xl w-1/2"></div>
                        <div className="h-4 bg-sage/20 rounded-xl w-full"></div>
                        <div className="h-4 bg-sage/20 rounded-xl w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <ProfileCard className="max-w-md w-full text-center">
                    <div className="py-8">
                        <User className="w-16 h-16 mx-auto mb-4 text-sage/50" />
                        <h2 className="text-2xl font-playful font-semibold mb-2">Profile Not Found</h2>
                        <p className="text-charcoal/70 mb-6">{error || 'This profile doesn\'t exist.'}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="btn-secondary"
                        >
                            Go Home
                        </button>
                    </div>
                </ProfileCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header Card */}
                <ProfileCard>
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-mint to-sage rounded-full 
                          flex items-center justify-center shadow-lg">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-4xl font-playful font-bold text-charcoal mb-2">
                            {profile.full_name}
                        </h1>
                        {profile.age && (
                            <div className="flex items-center justify-center gap-2 text-charcoal/70">
                                <Cake className="w-4 h-4" />
                                <span>{profile.age} years old</span>
                            </div>
                        )}
                    </div>
                </ProfileCard>

                {/* Contact Information */}
                <ProfileCard>
                    <h2 className="text-xl font-playful font-semibold mb-4 text-charcoal">
                        Contact Information
                    </h2>
                    <div className="space-y-3">
                        {profile.email && (
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-sage" />
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="text-charcoal hover:text-sage transition-colors"
                                >
                                    {profile.email}
                                </a>
                            </div>
                        )}
                        {profile.contact_number && (
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-sage" />
                                <a
                                    href={`tel:${profile.contact_number}`}
                                    className="text-charcoal hover:text-sage transition-colors"
                                >
                                    {profile.contact_number}
                                </a>
                            </div>
                        )}
                        {profile.address && (
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-sage" />
                                <span className="text-charcoal">{profile.address}</span>
                            </div>
                        )}
                        {profile.relationship_status && (
                            <div className="flex items-center gap-3">
                                <Heart className="w-5 h-5 text-sage" />
                                <span className="text-charcoal">{profile.relationship_status}</span>
                            </div>
                        )}
                    </div>
                </ProfileCard>

                {/* Social Links */}
                {profile.social_links && profile.social_links.length > 0 && (
                    <ProfileCard>
                        <h2 className="text-xl font-playful font-semibold mb-4 text-charcoal">
                            Connect With Me
                        </h2>
                        <SocialLinks links={profile.social_links} />
                    </ProfileCard>
                )}

                {/* Footer */}
                <div className="text-center text-charcoal/50 text-sm">
                    <p>Powered by iTap 💚</p>
                </div>
            </div>
        </div>
    );
}
