import { createPortal } from "react-dom";

interface ModalProps {
    open: boolean;
    children: React.ReactNode;
}

export function Modal({ open, children }: ModalProps) {
    const modalRoot = document.getElementById("modal");
    if (!open || !modalRoot) return null;
    return createPortal(
        <div className="w-full h-full fixed z-999 top-0 left-0 bg-quaternary/35 flex items-center justify-center">
            {children}
        </div>,
        modalRoot
    );
}