export interface SocialLink {
    platform: string;
    url: string;
}

export interface Profile {
    id: string;
    username: string;
    full_name: string;
    age?: number;
    address?: string;
    contact_number?: string;
    relationship_status?: string;
    email?: string;
    social_links: SocialLink[];
    created_at?: string;
    updated_at?: string;
}

export interface ProfileFormData {
    username: string;
    full_name: string;
    age: string;
    address: string;
    contact_number: string;
    relationship_status: string;
    email: string;
    social_links: SocialLink[];
}
