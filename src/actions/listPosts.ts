'use server'

import { PostResponseType, PostType } from "@/types/post";

export const listPost = async (url: string) => {
    try {
        const postResponse = await fetch(url, {
            method: 'GET',
        });

        if (!postResponse.ok) {
            throw new Error(`Error: ${postResponse.status}`);
        }

        const posts: PostResponseType = await postResponse.json();
        return {
            message: 'Retrieve successfull!',
            success: true,
            data: posts.results
        };
    } catch (e) {
        console.error("Fetch error:", e);
        return {
            message: e || 'Something went wrong!',
            success: false
        };
    }
};
