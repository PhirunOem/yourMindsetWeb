'use client'

import { cn } from "@/utils/tailwindShadcn";

type LoadingTextProps = {
    className?: string,
}
export default function LoadingText({ className }: LoadingTextProps) {
    return (
        <div className={cn("flex items-center justify-center w-full flex-col", className)}>
            <div className="flex space-x-1 text-4xl font-bold text-[#30A5FF] max-md:text-2xl">
                {Array.from('Mindset...').map((letter, index) => (
                    <span
                        key={index}
                        className="animate-bounce"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
        </div>
    );
}
