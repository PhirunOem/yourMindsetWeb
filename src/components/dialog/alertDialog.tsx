import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import "./alertDialogStyles.css";

interface AlertDialogProps {
    trigger: React.ReactElement | null;
    title: string;
    content?: string;
    btn1?: React.ReactElement;
    btn2?: React.ReactElement;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

const AlertDialogCustom = ({
    trigger,
    title,
    content,
    btn1,
    btn2,
    open,
    setOpen,
}: AlertDialogProps) => (
    <AlertDialogPrimitive.Root open={open} onOpenChange={setOpen}>
        {trigger && (
            <AlertDialogPrimitive.Trigger asChild>
                {trigger}
            </AlertDialogPrimitive.Trigger>
        )}
        <AlertDialogPrimitive.Portal>
            <AlertDialogPrimitive.Overlay className="AlertDialogOverlay" />
            <AlertDialogPrimitive.Content className="AlertDialogContent">
                <AlertDialogPrimitive.Title className="AlertDialogTitle">
                    {title}
                </AlertDialogPrimitive.Title>
                {content && (
                    <AlertDialogPrimitive.Description className="AlertDialogDescription">
                        {content}
                    </AlertDialogPrimitive.Description>
                )}
                <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                    {btn1 && (
                        <AlertDialogPrimitive.Cancel asChild>
                            {btn1}
                        </AlertDialogPrimitive.Cancel>
                    )}
                    {btn2 && (
                        <AlertDialogPrimitive.Action asChild>
                            {btn2}
                        </AlertDialogPrimitive.Action>
                    )}
                </div>
            </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
);

export default AlertDialogCustom;
