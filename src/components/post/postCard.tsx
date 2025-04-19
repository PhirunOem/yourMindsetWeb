
import React, { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import ProfileAvartar from "../profile/profileAvartar";
import MenuIcon from '@/assets/svgs/menuIcon.svg'
import SignIn from '@/assets/svgs/signIn.svg'
import Like from '@/assets/svgs/like.svg'
import Liked from '@/assets/svgs/liked.svg'
import SentIcon from '@/assets/svgs/sent.svg'
import OutlineSent from '@/assets/svgs/outlineSent.svg'

import Comment from '@/assets/svgs/comment.svg'

import PostComment from "./commentCard";
import { cn, PostSchema } from "@/utils";
import getRelativeTime from "@/utils/getRelativeTime";
import Dialog from "../dialog/alertDialog";
import TextInput from "../input/TextInput";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentType } from "@/types/comment";
import { PostType } from "@/types/post";
import { useAuth } from "@/context/AuthContext";
import PopoverCustom from "../popover";
/* eslint-disable @typescript-eslint/no-explicit-any */
interface PostCardProps extends PostType {
    handleComment?: (comment: CommentType) => any;
    hanldeEditComment?: (commentId: string) => void;
    handleDeleteComment?: (commentId: string) => void;
    handleEditPost?: (postData: z.infer<typeof PostSchema>) => any;
    handleDeletePost?: (postId: string) => any;
}
export default function PostCard({
    id,
    title,
    detail,
    comments,
    likes,
    posted_by,
    created_at,
    image,
    handleDeletePost,
    handleComment,
    handleEditPost
}: PostCardProps) {

    const [like, setLikes] = useState<number>(likes)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isComment, setIsComment] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [commentData, setCommentData] = useState<any>(comments || [])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isEmptyComment, setIsEmptyComment] = useState<boolean>(true)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const session = useAuth()
    const router = useRouter()
    const isPostOwner = posted_by.id === session?.user?.id
    const totalComments = commentData?.length ?? []
    const ownerName = posted_by.name

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: title ?? '',
            detail: detail ?? ''
        }
    })

    function handleLike() {
        setLikes((prev) => prev + 1);
        setIsLiked(true);
    }
    const handleUnlike = () => {
        if (like > 0) {
            setLikes((prev) => prev - 1)
            setIsLiked(false)
        }
    }
    const handleCreateComment = async () => {
        if (!session.user) {
            router.push('/auth/signin')
            return;
        }
        if (!content) {
            setError('Content is required!')
            return;
        }
        setIsLoading(true)
        if (handleComment) {
            const { success, data } = await handleComment({
                content: content,
                postId: id
            })
            console.log('>>> data >>', data, success)
            if (success) {
                setIsLoading(false)
                setError('')
                setContent('')
                setCommentData((prevComments: any) => [data, ...prevComments]);
            }
        }
    }
    async function deletePost(postId: string) {
        setOpenDialog(true)
        setIsDeleting(true)
        if (handleDeletePost) {
            const success = await handleDeletePost(postId)
            if (success) {
                setOpenDialog(false)
                setIsDeleting(false)
                setIsOpenMenu(false)
            }
        }
    }
    async function editPost({ title, detail }: z.infer<typeof PostSchema>) {
        setIsEditing(true)
        if (handleEditPost) {
            const editData = {
                post_id: id,
                title: title,
                detail: detail
            }
            const returnData = await handleEditPost(editData)
            if (returnData?.success) {
                setIsEditing(false)
                setIsEdit(false)
            }
        }
    }

    return <div className="shawdow-md px-8 py-4 rounded-xl bg-white border-gray-300 border">
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <ProfileAvartar href="/" userName={ownerName} />
                <div>
                    <p className="text-base font-semibold">{ownerName}</p>
                    <p className="text-xs text-gray-500">{getRelativeTime(created_at)}</p>
                </div>
            </div>
            <div>
                {isPostOwner ? <PopoverCustom
                    trigger={<Image src={MenuIcon} alt={"Menu Icon"} width={20} height={70} onClick={() => setIsOpenMenu(true)} />}
                    content={<div className="border-[1px] rounded-md w-[80px] mt-2 mr-8 bg-white">
                        <button className={cn("p-1 text-blue-500 w-full text-start")} onClick={() => {
                            setIsEdit(true)
                            setIsOpenMenu(false)
                        }}>Edit</button>
                        <div className="border-b-[1px]"></div>
                        <Dialog
                            trigger={<button className={cn("p-1 text-red-500 w-full text-start")} onClick={() => {
                                setOpenDialog(true)
                            }}>Delete</button>}
                            title={'Are you sure to delete this post?'}
                            content={'You will not see this post at your profile anymore.'}
                            btn1={<button className="Button mauve" onClick={() => {
                                setOpenDialog(false)
                                setIsOpenMenu(false)
                            }}>No</button>}
                            btn2={<button className="Button red" onClick={() => deletePost(id)}>{isDeleting ? 'Deleting...' : 'Yes'}</button>}
                            open={openDialog}
                        />
                    </div>}
                    open={isOpenMenu}
                /> : <></>}
            </div>
        </div>
        <div>
            <div>
                {image && <Image src={SignIn} alt={"Menu Icon"} width={300} height={200} />}
            </div>
            <div className="px-6 py-4">
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(editPost)}>
                        {isEdit ? <Controller
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    value={field.value} type="text" onChange={(e) => {
                                        form.setValue('title', e.target.value)
                                    }}
                                    disabled={isEditing}
                                />
                            )}
                        /> : <p className="text-xl font-bold py-4">{title}</p>}
                        {
                            isEdit ? <Controller
                                name="detail"
                                control={form.control}
                                render={({ field }) => (
                                    <textarea {...field} placeholder="Type your detail here..." maxLength={250} minLength={5}
                                        className={cn("border-[#BCBCBC] border-[1px] h-[300px]",
                                            " px-[6px] py-[6px] focus:outline-none focus:ring-1 font-poppins w-full mt-2",
                                            "overflow-hidden resize-none"
                                        )}
                                    ></textarea>
                                )}
                                disabled={isEditing}
                            /> : <p className="whitespace-pre-line px-4">
                                {detail}
                            </p>
                        }
                        {
                            isEdit && <div className="flex justify-end gap-4">
                                <button className="border px-4 py-2 rounded-md"
                                    onClick={() => {
                                        setIsEdit(false)
                                        setIsEditing(false)
                                    }}
                                    disabled={isEditing}
                                >Cancel</button>
                                <button className="border px-4 py-2 bg-green-100 rounded-md" onClick={() => {
                                    editPost(form.getValues())
                                }}
                                    disabled={isEditing}
                                >{isEditing ? 'Saving...' : 'Save'}</button>
                            </div>
                        }
                    </form>
                </FormProvider>
            </div>
        </div>
        <div className="flex gap-6 pt-2">
            <div className="flex gap-1">
                {isLiked ? <Image src={Liked} alt={"Menu Icon"} width={20} height={20} className="cursor-pointer" onClick={handleUnlike} />
                    : <Image src={Like} alt={"Menu Icon"} width={20} height={20} className="cursor-pointer" onClick={handleLike} />}
                <p>{like}</p>
            </div>
            <div className="flex gap-1">
                <Image src={Comment} alt={"Menu Icon"} width={20} height={20} onClick={() => setIsComment(!isComment)} className="cursor-pointer" />
                <p>{totalComments}</p>
            </div>
        </div>
        {
            isComment && <div>
                <div className="mt-4 flex w-[100%] items-center gap-4 bg-[#F1F1F1] py-2 px-3 rounded-full">
                    <input className="w-full focus:outline-none bg-[#F1F1F1]"
                        placeholder="Comment..." name="comment"
                        onChange={(event: any) => {
                            setContent(event.target.value)
                            if (event.target.value) {
                                setIsEmptyComment(false)
                                setIsLoading(false)
                            }
                            else setIsEmptyComment(true)
                        }}
                        value={content} />
                    <div>
                        {
                            !isEmptyComment ?
                                isLoading ? <p className="text-gray-500 text-xs">Commenting...</p>
                                    : <Image src={SentIcon} alt={"Menu Icon"} width={20} height={20} className="cursor-pointer" onClick={handleCreateComment} />
                                :
                                <Image src={OutlineSent} alt={"Menu Icon"} width={20} height={20} />
                        }
                    </div>
                </div>
                <p className="text-xs text-red-800">{error && error}</p>
                <div className="mt-2">
                    {totalComments == 0 ? <p className="text-gray-500 text-xs">This post has no comment yet! Comment to be a first comment.</p> :
                        commentData.map((item: any, index: number) => {
                            return <div className="mt-2" key={index}>
                                <PostComment id={""}
                                    ownerName={item['commented_by'].name}
                                    content={item.content}
                                    createdAt={item.created_at}
                                    like={0}
                                    ownerId={item['commented_by'].id}
                                />
                            </div>
                        }

                        )}
                </div>
            </div>
        }
    </div>
}