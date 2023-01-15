import type { TodoList } from "../../api/todoApi";
import { TodoListCard } from "../todoListCard/TodoListCard.component";

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
            {todoLists.map((todoList) => (
                <TodoListCard
                    data={todoList}
                    onDeleteList={onDeleteList}
                    onListClick={onListClick}
                    key={todoList.id}
                />
            ))}
        </div>
    );
};
