// components/UserInfo.tsx
"use client";

import { useAuth } from "@/context/AuthContext";

export default function UserInfo() {
    const { user } = useAuth();

    return (
        <div>
            {user ? (
                <p>Welcome, {user.name}</p>
            ) : (
                <p>Please <a href="/login">log in</a></p>
            )}
        </div>
    );
}
