import { Popover } from "radix-ui";
import React from "react";

interface PopoverCustomProps {
    trigger: React.ReactElement
    content: React.ReactElement
    open: boolean
}

export default function PopoverCustom({
    trigger, content, open = false
}: PopoverCustomProps) {
    return <>
        <Popover.Root open={open}>
            <Popover.Trigger>
                {trigger}
            </Popover.Trigger>
            <Popover.Content>
                {content}
            </Popover.Content>
        </Popover.Root>
    </>
}
