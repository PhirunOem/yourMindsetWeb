import React, { useEffect, useState } from "react";


import { listPost } from "@/actions/listPosts";
import PostCard from "./postCard";
import { postComment } from "@/actions/postComment";
import { deletePost } from "@/actions/deletePost";
import { PostSchema } from "@/utils";
import { z } from "zod";
import { editPost } from "@/actions/editPost";
import { PostType } from "@/types/post";
import { CommentType } from "@/types/comment";
import { useAuth } from "@/context/AuthContext";

export default function ListPosts() {
    const [postData, setPostData] = useState<PostType[]>([]);
    const session = useAuth()

    useEffect(() => {
        async function fetchData() {
            await listPost().then((res) => {
                if (res?.data?.length === 0 || !res) return []
                setPostData(res.data ?? []);
            })
        }
        fetchData();
    }, []);

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
        {postData.length > 0 ? (
            postData.map((item: PostType, index: number) => (
                <div key={index} className="mt-2">

                    <PostCard {...item}
                        handleComment={handleCreateComment}
                        handleDeletePost={() => handleDeletePost(item.id)}
                        handleEditPost={handleEditPost}
                    />
                </div>
            ))
        ) : (
            <p>Loading...</p>
        )}
    </div>
}