'use server'

import { cookies } from 'next/headers';

import { z } from 'zod';

import { CommentSchema } from './../utils/schemas';

type CommentSchemaType = z.infer<typeof CommentSchema>;
export const editComment = async ({
    content,
    comment_id
}: CommentSchemaType) => {
    try {
        const token = (await cookies()).get('accessToken')
        if (!token)
            return {
                success: false,
                error: 'Session is not avaliable',
            };
        const param = JSON.stringify({ comment_id: comment_id });
        const url = `${process.env.API_BASE_URL}/comment/edit-comment/?param=${param}`;
        const body = JSON.stringify({
            'content': content
        })

        const editCommentAPIResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            body
        });
        console.log('---------- editCommentAPIResponse ---------', editCommentAPIResponse)

        if (!editCommentAPIResponse.ok) {
            return;
        }
        const posts = await editCommentAPIResponse.json();
        return {
            success: true,
            message: posts.messgae || 'Comment has been edited successfully!'
        };
    } catch (e) {
        console.error("Fetch error:", e);
        return {
            success: false,
            message: 'Something went wrong!'
        };
    }
};
