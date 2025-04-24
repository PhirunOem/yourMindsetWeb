// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    is_admin: boolean;
    // Add other user fields as needed
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) => {
    const [user, setUser] = useState<User | null>(initialUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
