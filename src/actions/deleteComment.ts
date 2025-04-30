'use server'

import { cookies } from "next/headers";

interface DeleteCommentProps {
    commentId: string,
}
export const deleteComment = async ({
    commentId
}: DeleteCommentProps) => {

    try {
        const token = (await cookies()).get('accessToken')
        if (!token)
            return {
                success: false,
                error: 'Session is not avaliable',
            };
        const param = JSON.stringify({ "delete_id": commentId })
        const url = `${process.env.API_BASE_URL}/comment/edit-comment/?param=${param}`;

        const postResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
        });
        if (!postResponse.ok) {
            return;
        }

        const posts = await postResponse.json();
        return {
            success: true,
            message: posts.messgae || 'Comment has been deleted successfully!'
        };
    } catch (e) {
        console.error("Fetch error:", e);
        return {
            success: false,
            message: 'Something went wrong!'
        };
    }
};
