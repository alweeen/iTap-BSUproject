import { ReactNode } from 'react';

interface ProfileCardProps {
    children: ReactNode;
    className?: string;
}

export default function ProfileCard({ children, className = '' }: ProfileCardProps) {
    return (
        <div className={`glass-card transition-transform duration-200 hover:scale-[1.02] ${className}`}>
            {children}
        </div>
    );
}
