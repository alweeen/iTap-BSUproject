import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Profile } from '../lib/types';
import ProfileCard from '../components/ProfileCard';
import SocialLinks from '../components/SocialLinks';
import { User, MapPin, Phone, Mail, Heart, Cake } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const { setTheme } = useTheme();

    useEffect(() => {
        if (username) {
            fetchProfile();
        } else {
            navigate('/');
            setLoading(false);
        }
    }, [username]);

    const fetchProfile = async () => {
        if (!username) return;

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('username', username)
                .single();

            if (error) {
                console.error('Failed to load profile:', error);
                navigate('/');
                return;
            }

            if (data) {
                const profileData = data as Profile;
                setProfile(profileData);
                if (profileData.theme_id) {
                    setTheme(profileData.theme_id);
                }
            }
        } catch (err) {
            console.error('An unexpected error occurred:', err);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-background transition-colors duration-300">
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

    if (!profile) return null;

    return (
        <div className="min-h-screen py-12 px-4 bg-background text-text transition-colors duration-300">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header Card */}
                <ProfileCard>
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full 
                          flex items-center justify-center shadow-lg text-white">
                            <User className="w-12 h-12" />
                        </div>
                        <h1 className="text-4xl font-playful font-bold mb-2 text-text">
                            {profile.full_name}
                        </h1>
                        {profile.age && (
                            <div className="flex items-center justify-center gap-2 text-text-secondary">
                                <Cake className="w-4 h-4" />
                                <span>{profile.age} years old</span>
                            </div>
                        )}
                    </div>
                </ProfileCard>

                {/* Contact Information */}
                <ProfileCard>
                    <h2 className="text-xl font-playful font-semibold mb-4 text-text">
                        Contact Information
                    </h2>
                    <div className="space-y-3">
                        {profile.email && (
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-accent" />
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="transition-colors hover:opacity-80 text-text-secondary"
                                >
                                    {profile.email}
                                </a>
                            </div>
                        )}
                        {profile.contact_number && (
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-accent" />
                                <a
                                    href={`tel:${profile.contact_number}`}
                                    className="transition-colors hover:opacity-80 text-text-secondary"
                                >
                                    {profile.contact_number}
                                </a>
                            </div>
                        )}
                        {profile.address && (
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-accent" />
                                <span className="text-text-secondary">{profile.address}</span>
                            </div>
                        )}
                        {profile.relationship_status && (
                            <div className="flex items-center gap-3">
                                <Heart className="w-5 h-5 text-accent" />
                                <span className="text-text-secondary">{profile.relationship_status}</span>
                            </div>
                        )}
                    </div>
                </ProfileCard>

                {/* Social Links */}
                {profile.social_links && profile.social_links.length > 0 && (
                    <ProfileCard>
                        <h2 className="text-xl font-playful font-semibold mb-4 text-text">
                            Connect With Me
                        </h2>
                        <SocialLinks links={profile.social_links} />
                    </ProfileCard>
                )}

                {/* Footer */}
                <div className="text-center text-sm text-text-secondary">
                    <p>Powered by iTap 💚</p>
                </div>
            </div>
        </div>
    );
}
