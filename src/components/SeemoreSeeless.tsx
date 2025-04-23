import { cn } from "@/utils";
import React, { useMemo, useState } from "react";

interface SeeMoreTextProps {
    text: string;
    wordLimit?: number;
}

const SeeMoreText: React.FC<SeeMoreTextProps> = ({ text, wordLimit = 100 }) => {
    const [expanded, setExpanded] = useState(false);

    const words = text.split(" ");
    const isLong = words.length > wordLimit;

    const displayedText: string = useMemo(() => {
        return expanded ? text : words.slice(0, wordLimit).join(" ") + (isLong ? "..." : "");
    }, [expanded])

    return (
        <div className="whitespace-pre-wrap text-base font-normal leading-relaxed">
            <div onClick={() => {
                if (!expanded) return;
                setExpanded(false)
            }} className={cn(expanded && 'cursor-pointer')}>
                {displayedText}
            </div>
            {isLong && (
                <button
                    className="text-blue-600 mt-2 hover:underline focus:outline-none"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "See Less" : "See More"}
                </button>
            )}
        </div>
    );
};

export default SeeMoreText;
