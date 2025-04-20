'use server'

import { cookies } from "next/headers";

export async function getServerUser() {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) return null;

    try {
        const res = await fetch(`${process.env.API_BASE_URL}/account/user-profile/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return null;
        const user = await res.json();
        return user;
    } catch {
        return null;
    }
}
