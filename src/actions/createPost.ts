'use server'


import { z } from 'zod';

import { PostSchema } from './../utils/schemas';
import { cookies } from 'next/headers';

type PostSchemaType = z.infer<typeof PostSchema>;
export const createPost = async ({
    title,
    detail
}: PostSchemaType) => {
    try {
        const token = (await cookies()).get('accessToken')
        if (!token)
            return {
                success: false,
                error: 'Session is not avaliable',
            };
        const url = `${process.env.API_BASE_URL}/post/create-post/`;
        const body = JSON.stringify({
            'title': title,
            'detail': detail
        })
        const postResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            body
        });

        if (!postResponse.ok) {
            return;
        }
        const posts = await postResponse.json();
        return {
            success: true,
            message: posts.messgae || 'Post has been created successfully!'
        };
    } catch (e) {
        console.error("Fetch error:", e);
        return {
            success: false,
            message: 'Something went wrong!'
        };
    }
};
