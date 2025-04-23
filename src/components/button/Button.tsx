import React, { ReactElement } from "react";

import { cn } from "@/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    icon?: any;
}
export default function Button({
    title = 'Login',
    ...props
}: ButtonProps) {
    return <button
        {...props}
        disabled={props.disabled}
        className={cn("bg-[#30A5FF] rounded-3xl text-center px-[6px] py-[6px] w-[100px] text-white w-full hover:shadow-md",
            "font-bold text-[16px] cursor-pointer",
            props.className,
        )}>
        {title}
    </button>
}