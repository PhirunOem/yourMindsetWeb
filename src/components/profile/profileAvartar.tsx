'use client'

import * as React from "react";
import Link from "next/link";
import { cn } from "@/utils";

interface ProfileAvartarProps {
    userName?: string;
    href?: string;
    className?: string;
    userId?: string;
}

const ProfileAvartar = ({ userName, href, className, userId }: ProfileAvartarProps) => {
    const destination = href ?? `/profile/${userId}`;

    return (
        <Link href={destination} aria-label="profile">
            <button
                className={cn(
                    "w-[40px] h-[40px] rounded-full border-[1px]",
                    "border-gray-300 items-center content-center bg-gray-300 cursor-pointer hover:border-[3px]",
                    className
                )}
            >
                <p className="font-bold">
                    {userName ? userName.substring(0, 2) : 'U'}
                </p>
            </button>
        </Link>
    );
}

export default ProfileAvartar;
