'use server'

import { cookies } from "next/headers";

export const getUserProfile = async (userId: string) => {
    try {

        const token = (await cookies()).get('accessToken')

        if (!token)
            return {
                success: false,
                error: 'Session is not avaliable',
            };
        const param = JSON.stringify({ user_id: userId })
        const url = `${process.env.API_BASE_URL}/account/user-profile-with-posts/?param=${param}`;
        const userProfileResponse = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
        });

        if (!userProfileResponse.ok) {
            throw new Error(`Error: ${userProfileResponse.status}`);
        }

        const user: any = await userProfileResponse.json();
        return {
            message: 'Retrieve successfull!',
            success: true,
            data: user
        };
    } catch (e) {
        console.error("Fetch error:", e);
        return {
            message: e || 'Something went wrong!',
            success: false
        };
    }
};
