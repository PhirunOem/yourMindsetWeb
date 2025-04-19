import * as React from "react";
import { AlertDialog } from "radix-ui";
import "./alertDialogStyles.css";

interface AlertDialogProps {
    trigger: React.ReactElement
    title: string
    content?: string
    btn1?: React.ReactElement
    btn2?: React.ReactElement
    open?: boolean

}
const AlertDialogCustom = ({
    trigger,
    title,
    content,
    btn1,
    btn2,
    open
}: AlertDialogProps) => (
    <AlertDialog.Root open={open}>
        <AlertDialog.Trigger asChild>
            {trigger}
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="AlertDialogOverlay" />
            <AlertDialog.Content className="AlertDialogContent">
                <AlertDialog.Title className="AlertDialogTitle">
                    {title}
                </AlertDialog.Title>
                <AlertDialog.Description className="AlertDialogDescription">
                    {content}
                </AlertDialog.Description>
                <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                    <AlertDialog.Cancel asChild>
                        {btn1}
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        {btn2}
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);

export default AlertDialogCustom;