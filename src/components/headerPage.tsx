'use client'

import React, { useState } from "react";

import Image from "next/image";

import { cn } from "@/utils";
import Button from "./button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileAvartar from "./profile/profileAvartar";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import PopoverCustom from "./popover";
import lineMenuIcon from '@/assets/svgs/lineMenuIcon.svg'
import crossIcon from '@/assets/svgs/cross.svg'

export default function HeaderPage() {
    const session = useAuth()
    const userName = session.user?.name
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    React.useEffect(() => {
        if (session.user) {
            setIsAuthenticated(true)
        }
    }, [session])

    const handleOpenMenuClick = () => {
        setIsOpenMenu(!isOpenMenu)
    }
    return <div className={cn("flex justify-between px-16 max-md:px-2 z-40 text-center",
        "items-center pt-4 pb-4 border-b w-full top-0 left-0 fixed",
        "bg-white border-[1px] border-gray-300 shadow-md")}>
        <div className="max-md:flex max-md:justify-between max-md:items-center max-md:w-full max-md:px-2 lg:hidden xl:hidden 2xl:hidden">
            <div>
                <Logo />
            </div>
            <div>
                <PopoverCustom
                    trigger={
                        <Image
                            src={isOpenMenu ? crossIcon : lineMenuIcon}
                            alt={"Menu"}
                            width={20}
                            height={20}
                            onClick={handleOpenMenuClick}
                        />
                    }
                    content={
                        <div className={cn("flex flex-col px-4 py-2 justify-start w-[280px] items-start",
                            "border border-gray-300 shadow-md mr-2 rounded-md bg-white mt-2")}>
                            <Link href={"/testLevel"} className="">Test</Link>
                            <Link href={"/termAndConditions"} className="">Term And Condition</Link>
                            <Link href={"/privacyPolicy"} className="">Privacy Policy</Link>
                            <Link href={"/aboutUs"} className="">About Us</Link>
                            {isAuthenticated && <Link href={'/profile'}>Your Profile</Link>}
                            <div className="flex flex-row gap-4 items-center w-full mt-2">
                                <div>
                                    <Button
                                        title="Create Post"
                                        className={cn("px-4 py-2 rounded-md", !isAuthenticated && "bg-gray-400 text-[#00000077] opacity-75",
                                            "max-md:px-2 max-md:py-1"
                                        )}
                                        disabled={!isAuthenticated}
                                        onClick={() => router.push('/post')}
                                    />
                                </div>
                                <div>
                                    {
                                        !isAuthenticated &&
                                        <Button
                                            title="Sign Up"
                                            className="px-4 py-2 rounded-md max-md:px-2 max-md:py-1 max-md:text-m"
                                            onClick={() => router.push('/auth/signup')}
                                        />
                                    }
                                </div>

                            </div>
                        </div>
                    }
                    open={isOpenMenu} />
            </div>
        </div>
        <div className="flex items-center gap-8 max-md:hidden">
            <Logo />
            <Link href={"/testLevel"} className="max-md:hidden">Test</Link>
            <Link href={"/termAndConditions"} className="max-md:hidden">Term And Condition</Link>
            <Link href={"/privacyPolicy"} className="max-md:hidden">Privacy Policy</Link>
            <Link href={"/aboutUs"} className="max-md:hidden">About Us</Link>
        </div>
        <div className="flex gap-4 justify-between max-md:hidden">
            <div>
                <Button
                    title="Create Post"
                    className={cn("px-4 py-2 rounded-md", !isAuthenticated && "bg-gray-400 text-[#00000077] opacity-75",
                    )}
                    disabled={!isAuthenticated}
                    onClick={() => router.push('/post')}
                />
            </div>
            <div>
                {
                    isAuthenticated ? <ProfileAvartar userName={userName ?? undefined} />
                        : <Button
                            title="Sign Up"
                            className="px-4 py-2 rounded-md"
                            onClick={() => router.push('/auth/signup')}
                        />
                }
            </div>
        </div>
    </div>
}