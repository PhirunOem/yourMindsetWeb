import React, { useEffect, useState } from "react";

import { z } from "zod";
import useSWR from "swr";

import PostCard from "./postCard";
import { postComment } from "@/actions/postComment";
import { deletePost } from "@/actions/deletePost";
import { PostSchema } from "@/utils";
import { editPost } from "@/actions/editPost";
import { PostType } from "@/types/post";
import { CommentType } from "@/types/comment";
import { useAuth } from "@/context/AuthContext";
import { listPost } from "@/actions/listPosts";
import LoadingText from "../LoadingText";

export default function ListPosts() {
    const [postData, setPostData] = useState<PostType[]>([]);
    const session = useAuth()
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/list-posts-without-auth/`;
    const { data, error } = useSWR(url, listPost)
    if (!data) return <LoadingText className="min-h-svw pt-16" />
    if (error) return <div className="flex flex-col justify-center items-center text-red-500">Something went wrong. We are so sorry for that.</div>

    async function handleCreateComment(content: CommentType) {
        const postData = {
            postId: content.postId,
            content: content.content
        }
        return await postComment(postData).then((res: any) => {
            const newCommentObj = {
                commented_by: session?.user,
                content: content.content,
                created_at: new Date().toISOString(),
            };
            if (res?.success) {
                return {
                    success: true,
                    data: newCommentObj
                }
            } else return {
                success: false
            }
        })
    }
    async function handleDeletePost(postId: string) {
        const deleteId = {
            postId: postId
        }
        return await deletePost(deleteId).then((res: any) => {
            if (res?.success) {
                setPostData((prevPost) => prevPost.filter((post) => post.id !== postId))
                return {
                    success: true,
                }
            } else return {
                success: false
            }
        })
    }
    async function handleEditPost(postData: z.infer<typeof PostSchema>) {
        return await editPost(postData).then((res: any) => {
            if (res?.success) {
                setPostData((prev) =>
                    prev.map((p) => (p.id === postData.post_id ? {
                        ...p,
                        title: postData.title,
                        detail: postData.detail
                    } : p))
                );
                return {
                    success: true,
                }
            }
            else {
                return {
                    success: false,
                }
            }
        });
    }
    return <div>
        {data?.data && data?.data?.length > 0 && (
            data.data.map((item: PostType, index: number) => (
                <div key={index} className="mt-2">
                    <PostCard {...item}
                        handleComment={handleCreateComment}
                        handleDeletePost={() => handleDeletePost(item.id)}
                        handleEditPost={handleEditPost}
                    />
                </div>
            )))
        }
    </div>
}