'use client'

import * as React from "react";

import { useRouter } from "next/navigation";
import { cn } from "@/utils";

interface ProfileAvartarProps {
    userName?: string
    href?: string,
    className?: string,
    userId?: string,
}
const ProfileAvartar = ({ userName, href, className, userId }: ProfileAvartarProps) => {
    const router = useRouter()
    return <button
        className={cn("w-[40px] h-[40px] rounded-full border-[1px]",
            "border-gray-300 items-center content-center bg-gray-300 cursor-pointer hover:border-[3px]",
            className)}
        aria-label="profile"
        onClick={() => router.push(href ?? `/profile/${userId}`)}
    >
        <p className="font-bold">{userName ? userName.substring(0, 2) : 'U'}</p>
    </button>
}

export default ProfileAvartar;
