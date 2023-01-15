import classNames from "classnames";
import Image from "next/image";

import type { TodoItem } from "../../api/todoApi";
import { isOverdue } from "../../utils/isOverdue";

type TodoItemCardProps = {
    data: TodoItem;
    onDoneClick: (todoItem: TodoItem) => void;
    onDeleteClick: (todoItemId: string) => void;
};

export const TodoItemCard = ({
    data,
    onDoneClick,
    onDeleteClick,
}: TodoItemCardProps) => {
    const getDateTimeString = (date: Date): string => {
        return date.toLocaleString("sk-SK", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getTodoItemClassname = (todoItem: TodoItem): string => {
        if (todoItem.isFinished) {
            return "bg-amcef-primary text-amcef-black";
        }
        if (isOverdue(new Date(todoItem.date))) {
            return "bg-amcef-secondary";
        }
        return "bg-amcef-white text-amcef-black";
    };

    return (
        <div
            className={classNames(
                getTodoItemClassname(data),
                "flex flex-col justify-between rounded overflow-hidden p-2"
            )}
        >
            <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{data.title}</span>
                <Image
                    src="/close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => onDeleteClick(data.id)}
                />
            </div>
            <div className="whitespace-pre-wrap break-words">
                {data.description}
            </div>
            <div className="flex justify-between items-end gap-5">
                <span>{getDateTimeString(new Date(data.date))}</span>
                {!data.isFinished && (
                    <button
                        className="btn hover:bg-amcef-primary hover:text-amcef-black"
                        onClick={() => onDoneClick(data)}
                    >
                        Done
                    </button>
                )}
            </div>
        </div>
    );
};
