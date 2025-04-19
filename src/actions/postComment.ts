'use server'

import { useAuth } from "@/context/AuthContext";
import { cookies } from "next/headers";


interface PostedCommentProps {
    postId: string,
    content: string,
}
export const postComment = async ({
    postId,
    content
}: PostedCommentProps) => {

    try {
        const token = (await cookies()).get('accessToken')
        if (!token)
            return {
                success: false,
                error: 'Token is not avaliable.',
            };

        const url = `${process.env.API_BASE_URL}/comment/create-comment/`;
        const body = JSON.stringify({
            'post_id': postId,
            'content': content
        })

        const postCommentResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            body
        });

        if (!postCommentResponse.ok) {
            return;
        }

        const posts = await postCommentResponse.json();
        return {
            success: true,
            message: posts.messgae || 'Comment successfully!'
        };
    } catch (e) {
        console.error("Fetch error:", e);
        return {
            success: false,
            message: 'Something went wrong!'
        };
    }
};
