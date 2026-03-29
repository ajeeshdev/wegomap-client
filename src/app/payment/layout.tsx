import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Payment Options | WEGOMAP',
    description: 'Securely pay for your travel bookings with WEGOMAP. We accept all major payment methods including Google Pay, credit/debit cards, and bank transfers.',
    keywords: 'secure payment, Google Pay UPI, travel booking payment, Kerala tour payment',
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
    return children;
}
