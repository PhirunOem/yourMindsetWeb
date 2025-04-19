import * as React from "react";
import { Dialog } from "radix-ui";
import "./dialogStyles.css";

interface DialogCustomProps {
    trigger: React.ReactElement,
    title?: string,
    description?: string,
    child: React.ReactElement
}
const DialogCustom = ({
    trigger,
    title,
    description,
    child
}: DialogCustomProps) => (
    <Dialog.Root>
        <Dialog.Trigger asChild>
            {trigger}
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
                <Dialog.Description className="DialogDescription">
                    {description}
                </Dialog.Description>
                {child}
                <div
                    style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                >
                    <Dialog.Close asChild>
                        <button className="Button green">Save changes</button>
                    </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        Cancel
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

export default DialogCustom;
