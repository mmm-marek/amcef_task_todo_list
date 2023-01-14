import React from "react";
import classNames from "classnames";

type ModalProps = {
    children: React.ReactNode | React.ReactNode[];
    isOpen?: boolean;
    onClose: () => void;
};

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
    return (
        <>
            <div className={classNames("modal", isOpen ? "modal-open" : "")}>
                <div className="modal-box relative">
                    <button
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
};
