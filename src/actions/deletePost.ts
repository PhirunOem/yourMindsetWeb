'use server'

import { cookies } from "next/headers";

interface DeletePostProps {
    postId: string,
}
export const deletePost = async ({
    postId
}: DeletePostProps) => {

    try {
        const token = (await cookies()).get('accessToken')
        if (!token)
            return {
                success: false,
                error: 'Session is not avaliable',
            };
        const param = JSON.stringify({ "delete_id": postId })
        const url = `${process.env.API_BASE_URL}/post/edit-post/?param=${param}`;

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
            message: posts.messgae || 'Post has been deleted successfully!'
        };
    } catch (e) {
        console.error("Fetch error:", e);
        return {
            success: false,
            message: 'Something went wrong!'
        };
    }
};
