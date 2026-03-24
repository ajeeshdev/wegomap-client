"use client";

import { Heart } from 'lucide-react';

interface WishlistButtonProps {
    id: string;
    wishlist: string[];
    toggleWishlist: (id: string, e: React.MouseEvent) => void;
    className?: string;
}

export default function WishlistButton({ id, wishlist, toggleWishlist, className = "" }: WishlistButtonProps) {
    const isSelected = wishlist.includes(id);
    return (
        <button
            className={`wishlistBtn ${isSelected ? 'selected' : ''} ${className}`}
            aria-label="Add to wishlist"
            onClick={(e) => toggleWishlist(id, e)}
        >
            <Heart size={18} fill={isSelected ? "currentColor" : "none"} />
        </button>
    );
}
