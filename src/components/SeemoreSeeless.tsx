import { cn } from "@/utils";
import React, { useMemo, useState } from "react";

interface SeeMoreTextProps {
    text: string;
    charLimit?: number;
}

const SeeMoreText: React.FC<SeeMoreTextProps> = ({ text, charLimit = 100 }) => {
    const [expanded, setExpanded] = useState(false);

    const isLong = text.length > charLimit;

    const displayedText = useMemo(() => {
        return expanded ? text : text.slice(0, charLimit) + (isLong ? "..." : "");
    }, [expanded, text, charLimit, isLong]);

    return (
        <div className="whitespace-pre-wrap text-base font-normal leading-relaxed">
            <div
                onClick={() => {
                    if (!expanded) return;
                    setExpanded(false);
                }}
                className={cn(expanded && "cursor-pointer")}
            >
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
