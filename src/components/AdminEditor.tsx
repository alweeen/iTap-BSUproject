import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ProfileFormData, SocialLink } from '../lib/types';
import { Plus, Trash2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import ThemeSelector from './ThemeSelector';

interface AdminEditorProps {
    initialData: ProfileFormData;
    profileId: string;
    onSave: (formData?: ProfileFormData) => void | Promise<void>;
    isCreating?: boolean;
}

export default function AdminEditor({ initialData, profileId, onSave, isCreating = false }: AdminEditorProps) {
    const [formData, setFormData] = useState<ProfileFormData>(initialData);
    const [saving, setSaving] = useState(false);

    const handleInputChange = (field: keyof ProfileFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddSocialLink = () => {
        setFormData(prev => ({
            ...prev,
            social_links: [...prev.social_links, { platform: '', url: '' }]
        }));
    };

    const handleRemoveSocialLink = (index: number) => {
        setFormData(prev => ({
            ...prev,
            social_links: prev.social_links.filter((_, i) => i !== index)
        }));
    };

    const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
        setFormData(prev => ({
            ...prev,
            social_links: prev.social_links.map((link, i) =>
                i === index ? { ...link, [field]: value } : link
            )
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Validate email if provided
            if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                toast.error('Please enter a valid email address');
                setSaving(false);
                return;
            }

            // Filter out empty social links
            const validSocialLinks = formData.social_links.filter(
                link => link.platform.trim() && link.url.trim()
            );

            if (isCreating) {
                // For create mode, just pass the data to onSave
                await onSave({ ...formData, social_links: validSocialLinks });
            } else {
                // For update mode, update the database
                const { error } = await (supabase
                    .from('profiles') as any)
                    .update({
                        username: formData.username,
                        full_name: formData.full_name,
                        age: formData.age ? parseInt(formData.age) : null,
                        address: formData.address || null,
                        contact_number: formData.contact_number || null,
                        relationship_status: formData.relationship_status || null,
                        email: formData.email || null,
                        social_links: validSocialLinks,
                        theme_id: formData.theme_id || 'lavender',
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', profileId);

                if (error) {
                    toast.error('Failed to save changes');
                    console.error(error);
                    return;
                }

                toast.success('Profile updated successfully!');
                onSave();
            }
        } catch (err) {
            toast.error('An unexpected error occurred');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-playful font-semibold text-charcoal">
                    Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-sage/20 
                       focus:border-sage focus:outline-none transition-colors bg-white/50"
                            placeholder="johndoe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => handleInputChange('full_name', e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-sage/20 
                       focus:border-sage focus:outline-none transition-colors bg-white/50"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                            Age
                        </label>
                        <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-sage/20 
                       focus:border-sage focus:outline-none transition-colors bg-white/50"
                            placeholder="25"
                            min="1"
                            max="120"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                            Relationship Status
                        </label>
                        <input
                            type="text"
                            value={formData.relationship_status}
                            onChange={(e) => handleInputChange('relationship_status', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-sage/20 
                       focus:border-sage focus:outline-none transition-colors bg-white/50"
                            placeholder="Single, Married, etc."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-sage/20 
                     focus:border-sage focus:outline-none transition-colors bg-white/50"
                        placeholder="City, Country"
                    />
                </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-playful font-semibold text-charcoal">
                    Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-sage/20 
                       focus:border-sage focus:outline-none transition-colors bg-white/50"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            value={formData.contact_number}
                            onChange={(e) => handleInputChange('contact_number', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-sage/20 
                       focus:border-sage focus:outline-none transition-colors bg-white/50"
                            placeholder="+1 234 567 8900"
                        />
                    </div>
                </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-4">
                <h3 className="text-lg font-playful font-semibold text-charcoal">
                    Profile Theme
                </h3>
                <ThemeSelector
                    selectedThemeId={formData.theme_id}
                    onSelect={(themeId) => handleInputChange('theme_id', themeId)}
                />
            </div>

            {/* Social Links */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-playful font-semibold text-charcoal">
                        Social Links
                    </h3>
                    <button
                        type="button"
                        onClick={handleAddSocialLink}
                        className="flex items-center gap-2 text-sage hover:text-sage/80 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Link
                    </button>
                </div>

                <div className="space-y-3">
                    {formData.social_links.map((link, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={link.platform}
                                onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                                className="w-1/3 px-4 py-3 rounded-xl border-2 border-sage/20 
                         focus:border-sage focus:outline-none transition-colors bg-white/50"
                                placeholder="Platform (e.g., Instagram)"
                            />
                            <input
                                type="url"
                                value={link.url}
                                onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl border-2 border-sage/20 
                         focus:border-sage focus:outline-none transition-colors bg-white/50"
                                placeholder="https://..."
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveSocialLink(index)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={saving}
                className="w-full btn-secondary flex items-center justify-center gap-2 
                 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
}
