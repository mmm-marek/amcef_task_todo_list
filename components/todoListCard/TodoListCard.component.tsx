import Image from "next/image";
import { TodoList } from "../../api/todoApi";

type TodoListCardProps = {
    data: TodoList;
    onDeleteList: (todoListId: string) => void;
    onListClick: (todoListId: string) => void;
};

export const TodoListCard = ({
    data,
    onDeleteList,
    onListClick,
}: TodoListCardProps) => {
    return (
        <div
            className="flex justify-between items-center w-72 h-10 rounded px-5 cursor-pointer bg-amcef-white hover:bg-amcef-white-hover"
            onClick={() => onListClick(data.id)}
        >
            <span className="text-amcef-black font-bold">{data.title}</span>
            <Image
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteList(data.id);
                }}
                src="/close.svg"
                alt="close"
                width={20}
                height={20}
            />
        </div>
    );
};
