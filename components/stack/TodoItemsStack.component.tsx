import Image from "next/image";
import classNames from "classnames";
import { TodoItem } from "../../api/todoApi";
import { isOverdue } from "../../utils/isOverdue";

type TodoItemsStackProps = {
    todoItems: TodoItem[];
    onDoneClick: (todoItem: TodoItem) => void;
    onDeleteClick: (todoItemId: string) => void;
};

export const TodoItemsStack = ({
    todoItems,
    onDoneClick,
    onDeleteClick,
}: TodoItemsStackProps) => {
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
        <div>
            <div className="flex flex-col xl:w-full xl:grid xl:grid-cols-3 gap-5">
                {todoItems.map((todoItem) => {
                    return (
                        <div
                            key={todoItem.id}
                            className={classNames(
                                getTodoItemClassname(todoItem),
                                "flex flex-col justify-between rounded overflow-hidden p-2"
                            )}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">
                                    {todoItem.title}
                                </span>
                                <Image
                                    src="/close.svg"
                                    alt="close"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                    onClick={() => onDeleteClick(todoItem.id)}
                                />
                            </div>
                            <div>{todoItem.description}</div>
                            <div className="flex justify-between items-end">
                                <span>
                                    {getDateTimeString(new Date(todoItem.date))}
                                </span>
                                {!todoItem.isFinished && (
                                    <button
                                        className="btn hover:bg-amcef-primary hover:text-amcef-black"
                                        onClick={() => onDoneClick(todoItem)}
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
