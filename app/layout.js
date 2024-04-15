import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Next Events',
    description: 'Discover Exciting Enents to Attend',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Toaster position="bottom-right" />
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
