'use client';

import { SessionProvider } from 'next-auth/react';

export async function AuthProvider({ children }) {
    return <SessionProvider>{children}</SessionProvider>;
}
