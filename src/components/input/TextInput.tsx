import { cn } from "@/utils";
import React from "react";


interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string
}
interface ErrorProps {
    error?: string;
}
export default function TextInput({
    placeholder = 'Enter your name...',
    ...props
}: TextInputProps & ErrorProps) {
    return (
        <div>
            <input
                autoComplete="off"
                {...props}
                placeholder={placeholder}
                className={cn("border-[#BCBCBC] border-[1px]",
                    " px-[6px] py-[6px] focus:outline-none focus:ring-1 font-poppins w-full",
                )}
            />
            {
                props.error && <p className="text-red-800 text-start text-sm">{props.error}</p>
            }
        </div>
    );
}
