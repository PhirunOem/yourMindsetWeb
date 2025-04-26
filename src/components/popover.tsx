'use client'

import * as Popover from "@radix-ui/react-popover";
import React from "react";

interface PopoverCustomProps {
    trigger: React.ReactElement;
    content: React.ReactElement;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function PopoverCustom({
    trigger,
    content,
    isOpen,
    setIsOpen,
}: PopoverCustomProps) {
    return (
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger asChild className="cursor-pointer">
                {trigger}
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="z-2000 outline-none"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                >
                    {content}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
