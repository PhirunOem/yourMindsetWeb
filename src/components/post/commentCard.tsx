import Image from "next/image";

import ProfileAvartar from "../profile/profileAvartar";
import MenuIcon from '@/assets/svgs/menuIcon.svg'
import SignIn from '@/assets/svgs/signIn.svg'
import Like from '@/assets/svgs/like.svg'
import Liked from '@/assets/svgs/liked.svg'

import React from "react";
import { cn } from "@/utils";
import getRelativeTime from "@/utils/getRelativeTime";
import PopoverCustom from "../popover";
import { useAuth } from "@/context/AuthContext";
import Dialog from "../dialog/alertDialog";


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
    ownerName,
    image,
    content,
    createdAt,
    like,
    ownerId,
    // editComment,
    // deleteComment
}: PostCardProps) {

    const [likes, setLikes] = React.useState<number>(like)
    const [isLiked, setIsLiked] = React.useState<boolean>(false)
    const session = useAuth()
    const isPostOwner = ownerId === session?.user?.id
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
                    trigger={<Image src={MenuIcon} alt={"Menu Icon"} width={20} height={70} />}
                    content={<div className="border-[1px] rounded-md w-[80px] mt-2 mr-8 bg-white">
                        <Dialog
                            title=""
                            trigger={<button className={cn("p-1 text-blue-500")}>Edit</button>}
                            btn2={<button className="Button red">No</button>}
                            btn1={<button className="Button mauve">yes</button>} />
                        <div className="border-b-[1px]"></div>
                        <Dialog
                            trigger={<button className={cn("p-1 text-red-500")}>Delete</button>}
                            title={'Are you sure to delete this comment?'}
                            btn2={<button className="Button red">No</button>}
                            btn1={<button className="Button mauve">yes</button>} />
                    </div>} isOpen={false} /> : <></>}
            </div>
        </div>
        <div>

            <div>
                {image && <Image src={SignIn} alt={"Menu Icon"} width={300} height={200} />}
            </div>
            <div className="px-8 py-2">
                <p>
                    {content}
                </p>
            </div>
        </div>
        <div className="flex gap-6 pt-2 px-8">
            <div className="flex gap-1">
                {isLiked ? <Image src={Liked} alt={"Menu Icon"} width={20} height={20} className="cursor-pointer" onClick={handleUnlike} />
                    : <Image src={Like} alt={"Menu Icon"} width={20} height={20} className="cursor-pointer" onClick={handleLike} />}
                <p>{likes}</p>
            </div>
        </div>
    </div>
}