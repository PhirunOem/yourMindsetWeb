'use server'

import { cookies } from 'next/headers';

import { z } from 'zod';

import { PostSchema } from './../utils/schemas';

type PostSchemaType = z.infer<typeof PostSchema>;
export const editPost = async ({
    title,
    detail,
    post_id
}: PostSchemaType) => {
    try {
        const token = (await cookies()).get('accessToken')
        if (!token)
            return {
                success: false,
                error: 'Session is not avaliable',
            };
        const param = JSON.stringify({ post_id: post_id });
        const url = `${process.env.API_BASE_URL}/post/edit-post/?param=${param}`;
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
