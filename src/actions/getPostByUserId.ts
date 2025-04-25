'use server'

import { PostType } from "@/types/post";
import { cookies } from "next/headers";

export const listPostByUserId = async (userId: string) => {
    try {
        const token = (await cookies()).get('accessToken')

        if (!token)
            return {
                success: false,
                error: 'Session is not avaliable',
            };
        const param = JSON.stringify({ user_id: userId });
        const url = `${process.env.API_BASE_URL}/post/list-posts/?param=${param}`;
        const postResponse = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
        });

        if (!postResponse.ok) {
            throw new Error(`Error: ${postResponse.status}`);
        }

        const posts: PostType[] = await postResponse.json();
        return {
            message: 'Retrieve successfull!',
            success: true,
            data: posts
        };
    } catch (e) {
        console.error("Fetch error:", e);
        return {
            message: e || 'Something went wrong!',
            success: false
        };
    }
};
