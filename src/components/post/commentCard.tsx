import Image from "next/image";

import ProfileAvartar from "../profile/profileAvartar";
import MenuIcon from '@/assets/svgs/menuIcon.svg'
import SignIn from '@/assets/svgs/signIn.svg'
import Like from '@/assets/svgs/like.svg'
import Liked from '@/assets/svgs/liked.svg'

import React, { useState, useTransition } from "react";
import { cn, CommentSchema } from "@/utils";
import getRelativeTime from "@/utils/getRelativeTime";
import PopoverCustom from "../popover";
import { useAuth } from "@/context/AuthContext";
import Dialog from "../dialog/alertDialog";
import { editComment } from "@/actions/editComment";
import { deleteComment } from "@/actions/deleteComment";
import { AlertSuccess } from "@/utils/alertSuccess";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


interface PostCardProps {
    id: string,
    ownerName: string,
    image?: string,
    content: string,
    createdAt: string,
    like: number,
    ownerId: string,
    // editComment?: () => void;
    // deleteComment?: () => void;
}
export default function CommentCard({
    id,
    ownerName,
    image,
    content,
    createdAt,
    like,
    ownerId,
    // editComment,
    // deleteComment
}: PostCardProps) {

    const [likes, setLikes] = useState<number>(like)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const [isOpenDialog, setOpenDialog] = useState<boolean>(false)
    const [deleting, startDeleteCommentTransaction] = useTransition()
    const [updating, startUpdateCommentTransaction] = useTransition()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const session = useAuth()
    const isPostOwner = ownerId === session?.user?.id

    const form = useForm<z.infer<typeof CommentSchema>>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            content: content ?? ''
        }
    })
    const handleLike = () => {
        setLikes((prev) => prev + 1)
        setIsLiked(true)
    }
    const handleUnlike = () => {
        if (likes > 0) {
            setLikes((prev) => prev - 1)
            setIsLiked(false)
        }
    }

    const handleCommentDelete = () => {
        startDeleteCommentTransaction(async () => {
            const result = await deleteComment({ commentId: id })
            if (!result?.success) {
                setOpenDialog(false)
                return;
            };
            AlertSuccess(result.message);
            setOpenDialog(false)
        })
    }

    const handleCommentEdit = ({ content }: z.infer<typeof CommentSchema>) => {
        startUpdateCommentTransaction(async () => {
            const updateData = {
                content: content,
                comment_id: id
            }
            const result = await editComment(updateData)
            if (!result?.success) {
                setIsEdit(true)
                return;
            }
            setIsEdit(false)
            AlertSuccess(result.message)
        })
    }

    return <div className="bg-[#F1F1F1] px-4 py-4 rounded-md">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <ProfileAvartar href="/" userName={ownerName} />
                <div>
                    <p className="text-base font-semibold">{ownerName}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">{getRelativeTime(createdAt)}</p>
                </div>
            </div>
            <div>
                {isPostOwner ? <PopoverCustom
                    trigger={<Image src={MenuIcon} alt={"Menu Icon"} width={20} height={70} onClick={() => setIsOpenMenu(true)} />}
                    content={
                        <div className="border-[1px] rounded-md w-[80px] mt-2 mr-8 bg-white">
                            <button
                                className="p-1 text-blue-500 w-full text-start"
                                onClick={() => {
                                    setIsEdit(true);
                                    setIsOpenMenu(false);
                                }}
                            >
                                Edit
                            </button>
                            <div className="border-b-[1px]" />
                            <button
                                className="p-1 text-red-500 w-full text-start"
                                onClick={() => {
                                    setOpenDialog(true);
                                    setIsOpenMenu(false);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    }
                    isOpen={isOpenMenu}
                    setIsOpen={setIsOpenMenu} />
                    : <></>
                }
            </div>
        </div>
        <div>

            <div>
                {image && <Image src={SignIn} alt={"Menu Icon"} width={300} height={200} />}
            </div>
            <div className="px-8 py-2">
                {isEdit ?
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(handleCommentEdit)}>
                            <Controller
                                name="content"
                                control={form.control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        placeholder="Type your detail here..."
                                        maxLength={3000}
                                        minLength={5}
                                        className={cn(
                                            "border-[#BCBCBC] border-[1px] h-[300px]",
                                            "px-[6px] py-[6px] focus:outline-none focus:ring-1 font-poppins w-full mt-2",
                                            "overflow-hidden resize-none"
                                        )}
                                        disabled={updating}
                                    />
                                )}
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    className="border px-4 py-2 rounded-md"
                                    onClick={() => {
                                        setIsEdit(false);
                                    }}
                                    disabled={updating}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="border px-4 py-2 bg-green-100 rounded-md"
                                    type="submit"
                                    disabled={updating}
                                >
                                    {updating ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                    : <p>
                        {content}
                    </p>}
            </div>
        </div>
        <div className="flex gap-6 pt-2 px-8">
            <div className="flex gap-1">
                {isLiked ? <Image src={Liked} alt={"Menu Icon"} width={20} height={20} className="cursor-pointer" onClick={handleUnlike} />
                    : <Image src={Like} alt={"Menu Icon"} width={20} height={20} className="cursor-pointer" onClick={handleLike} />}
                <p>{likes}</p>
            </div>
        </div>
        <Dialog
            trigger={null}
            title={'Are you sure to delete this comment ?'}
            btn2={
                <button
                    className="Button red"
                    onClick={() => {
                        setIsOpenMenu(false);
                        setOpenDialog(false)
                    }}
                    disabled={deleting}
                >No</button>
            }
            btn1={
                <button className="Button mauve"
                    onClick={handleCommentDelete}
                >{deleting ? 'Deleting...' : 'Yes'}</button>
            }
            open={isOpenDialog}
        />
    </div>
}