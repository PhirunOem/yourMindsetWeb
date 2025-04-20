// app/login/page.tsx
"use client";

import { useState } from "react";

import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    // const { setUser } = useAuth();
    // const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/account/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // <== required to store Django cookie
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json()

            if (!res.ok) {
                return;
            }

            Cookies.set("accessToken", data?.access, { secure: true, sameSite: "Lax" });

            // // Now fetch user profile with the session cookie
            // const profileRes = await fetch(`${process.env.API_BASE_URL}/account/me/`, {
            //     credentials: "include",
            // });

            // const userData = await profileRes.json();
            // setUser(userData);
            // router.push("/dashboard");
        } catch (err) {
            console.error("Login error", err);
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-16 flex flex-col">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" /> <br />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
            <button type="submit">Login</button>
        </form>
    );
}
