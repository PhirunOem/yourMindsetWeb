'use server'

import { PostType } from "@/types/post";

export const listPost = async (url: string) => {
    try {
        const postResponse = await fetch(url, {
            method: 'GET',
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
