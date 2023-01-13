import type { TodoList } from "../../api/todoApi";

type TodoListStackProps = {
    todoLists: TodoList[];
    onDeleteList: (todoListId: string) => void;
};

export const TodoListStack = ({
    todoLists,
    onDeleteList,
}: TodoListStackProps) => {
    return (
        <div>
            {todoLists.map(({ title, id }) => (
                <div key={id} onClick={() => onDeleteList(id)}>
                    {title}
                </div>
            ))}
        </div>
    );
};
