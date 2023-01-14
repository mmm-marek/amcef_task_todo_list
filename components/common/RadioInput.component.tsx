import { ChangeEvent } from "react";

type RadioInputProps = {
    label: string;
    id: string;
    value: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioInput = ({
    id,
    label,
    value,
    name,
    onChange,
}: RadioInputProps) => {
    return (
        <div className="flex items-center">
            <label htmlFor={id} className="text-2xl mr-3">
                {label}
            </label>
            <input
                id={id}
                type="radio"
                name={name}
                className="radio"
                value={value}
                onChange={(e) => onChange(e)}
            />
        </div>
    );
};
