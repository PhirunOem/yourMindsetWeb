'use client'

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import arrowBackIcon from '@/assets/svgs/arrowBackIcon.svg'
import ProfileAvartar from "@/components/profile/profileAvartar";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { Logout } from "@/actions/logout";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { listPostByUserId } from "@/actions/getPostByUserId";
import useSWR from "swr";
import { PostType } from "@/types/post";
import PostCard from "@/components/post/postCard";
import { deletePost } from "@/actions/deletePost";
import { editPost } from "@/actions/editPost";
import { postComment } from "@/actions/postComment";
import { CommentType } from "@/types/comment";
import { PostSchema } from "@/utils";
import { z } from "zod";
import { getUserProfile } from "@/actions/getUserProfile";

interface ProfilePageProps {
    userId: string,
}
export default function ProfilePage({ userId }: ProfilePageProps) {
    const { user } = useAuth();
    const router = useRouter()
    const [postData, setPostData] = useState<PostType[]>([]);
    const currentUserId = user?.id ? user?.id : ''
    const isOwner = userId === currentUserId
    const [userInfo, setUserInfo] = useState<{ email: string, name: string, id: string }>({
        email: '',
        name: '',
        id: ''
    })
    const [isPending, startTransition] = useTransition()

    useEffect(() => {

        async function getPosts() {
            if (userId) {
                const dataResponse = await getUserProfile(userId)
                const userObject = dataResponse?.data
                if (userObject) {
                    setUserInfo({
                        email: userObject.email,
                        name: userObject.name,
                        id: userObject.id,
                    })
                }
                const { data, success } = await listPostByUserId(userId)
                if (!success) {
                    return;
                }
                if (data) {
                    setPostData(data);
                }
            }
        }
        startTransition(() => {
            getPosts()
        })
    }, [user])

    const handleSignOutClick = async () => {
        await Logout();
        window.location.href = '/';
    }

    async function handleCreateComment(content: CommentType) {
        const postData = {
            postId: content.postId,
            content: content.content
        }
        return await postComment(postData).then((res: any) => {
            const newCommentObj = {
                commented_by: user,
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

    return (
        <div className="flex flex-col">
            <div className="p-8">
                <Link href={'/'}>
                    <Image src={arrowBackIcon} width={30} height={30} alt={""} />
                </Link>
            </div>
            {
                isPending ?
                    <div className="flex items-center justify-center text-center">Loading profile...</div>
                    : <div className="flex flex-1 justify-center items-center max-md:flex-col max-md:justify-center max-md:items-center">
                        <div className="w-full max-w-2xl flex justify-center items-center gap-8 bg-[#E8E8E8] max-md:bg-transparent py-16 px-6 rounded-xl shadow-md max-md:shadow-transparent max-md:py-4 max-md:flex-col max-md:text-center">

                            <div className="border-r-[2px] pr-8 max-md:border-none max-md:pr-0 max-md:mb-4 max-md:flex max-md:justify-center max-md:items-center">
                                <ProfileAvartar
                                    userName={userInfo.name}
                                    className="w-[100px] h-[100px] border-[3px] border-white max-md:w-[60px] max-md:h-[60px]"
                                />
                            </div>


                            <div className="w-[300px] max-md:w-full max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
                                <p className="font-bold text-2xl">{userInfo.name}</p>
                                <p>{userInfo.email}</p>
                                {
                                    isOwner && <div className="flex gap-3 w-full mt-2 max-md:justify-center">
                                        <Button
                                            title="Edit Profile"
                                            className="rounded-md"
                                            onClick={() => alert('This feature is coming soon...')}
                                        />
                                        <Button
                                            title="Log Out"
                                            onClick={handleSignOutClick}
                                            className="bg-red-500 px-2 rounded-md"
                                        />
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
            }
            <div className="flex justify-center">
                <div className="w-3/4 max-md:w-full max-md:px-2 py-4">
                    <p className="font-bold text-2xl">{isOwner ? 'My Posts' : 'Posts'}</p>
                    {
                        isPending ? <div className="flex items-center justify-center text-center">Loading post...</div> :
                            postData.length > 0 ? (
                                postData.map((item: PostType, index: number) => (
                                    <div key={index} className="mt-2">
                                        <PostCard
                                            {...item}
                                            handleComment={handleCreateComment}
                                            handleDeletePost={() => handleDeletePost(item.id)}
                                            handleEditPost={handleEditPost}
                                        />
                                    </div>
                                ))
                            ) :
                                <div className="mt-4">
                                    <p>You have no any posts yet. Please create your first post.</p>
                                </div>
                    }
                </div>
            </div>

        </div>
    )
}
