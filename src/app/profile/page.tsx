'use client'

import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import coverImage from '@/assets/images/cover.png'
import ProfileAvartar from "@/components/profile/profileAvartar";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { Logout } from "@/actions/logout";

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter()
    const handleSignOutClick = async () => {
        await Logout();
        window.location.href = '/';
    }
    return <div>
        <div className="relative justify-center flex text-center content-center items-center">
            <div className="absolute">
                <Image src={coverImage} alt={""} />
            </div>
            <div className="absolute top-25 left-20 max-md:top-3 max-md:left-5">
                <ProfileAvartar userName={user?.name} className="w-[100px] h-[100px] border-[3px] border-white max-md:w-[60px] max-md:h-[60px]" />
            </div>
            <div className="absolute top-40 p-10 max-md:top-8 w-full max-md:p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Button title="Edit Profile" className="rounded-[5px]" />
                        <div>
                            <h2 className="font-bold text-lg">{user?.name}</h2>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                    <div>
                        <Button title="Log out" className="bg-red-500 p-2 rounded-[5px]" onClick={handleSignOutClick} />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h2>No post</h2>
        </div>
    </div>
}