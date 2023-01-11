import React from "react";

type ModalProps = {
    id: string;
    label: string;
    children: React.ReactNode | React.ReactNode[];
};

export const Modal = ({ id, label, children }: ModalProps) => {
    return (
        <>
            <label htmlFor={id} className="btn">
                {label}
            </label>

            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor={id}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    {children}
                </div>
            </div>
        </>
    );
};
