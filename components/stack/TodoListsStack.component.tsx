import Image from "next/image";
import type { TodoList } from "../../api/todoApi";

type TodoListStackProps = {
    todoLists: TodoList[];
    onDeleteList: (todoListId: string) => void;
    onListClick: (todoListId: string) => void;
};

export const TodoListStack = ({
    todoLists,
    onDeleteList,
    onListClick,
}: TodoListStackProps) => {
    return (
        <div className="flex flex-col gap-2">
            {todoLists.map(({ title, id }) => (
                <div
                    key={id}
                    className="flex justify-between items-center w-72 h-10 rounded px-5 cursor-pointer bg-amcef-white hover:bg-amcef-white-hover"
                    onClick={() => onListClick(id)}
                >
                    <span className="text-amcef-black font-bold">{title}</span>
                    <Image
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteList(id);
                        }}
                        src="./close.svg"
                        alt="close"
                        width={20}
                        height={20}
                    />
                </div>
            ))}
        </div>
    );
};
