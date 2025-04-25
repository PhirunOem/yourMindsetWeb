'use client'

import * as Popover from "@radix-ui/react-popover";
import React, { useState } from "react";

interface PopoverCustomProps {
    trigger: React.ReactElement;
    content: React.ReactElement;
    isOpen: boolean;
}

export default function PopoverCustom({
    trigger,
    content,
    isOpen
}: PopoverCustomProps) {
    const [open, setOpen] = useState(isOpen);

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                {trigger}
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="z-2000"
                >
                    {content}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
