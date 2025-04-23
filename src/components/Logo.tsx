import React from "react";

import Image from "next/image";

import logo from '@/assets/svgs/logo.svg'

export default function Logo() {
    return <div className="items-center flex gap-2">
        <div>
            <Image src={logo} alt={"Logo"} className="w-[60px] h-[60px] max-md:w-[30px] max-md:w-[30px]" />
        </div>
        <div><p className="text-xl font-semibold max-md:text-md">Mindset</p></div>
    </div>
}