'use client'

import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import arrowBackIcon from '@/assets/svgs/arrowBackIcon.svg'
import ProfileAvartar from "@/components/profile/profileAvartar";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { Logout } from "@/actions/logout";
import Link from "next/link";

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter()
    const handleSignOutClick = async () => {
        await Logout();
        window.location.href = '/';
    }
    return <div>
        <div className="p-8">
            <Link href={'/'}>
                <Image src={arrowBackIcon} width={30} height={30} alt={""} />
            </Link>
            <div className="w-full justify-center items-center flex mt-8 gap-8">
                <div >
                    <ProfileAvartar userName={user?.name} className="w-[100px] h-[100px] border-[3px] border-white max-md:w-[60px] max-md:h-[60px]" />
                </div>
                <div className="border-r-[2px] w-[2px] h-full">

                </div>
                <div>
                    <p className="font-bold text-2xl">{user?.name}</p>
                    <p>{user?.email}</p>

                </div>
            </div>
        </div>
    </div>
}