import { TodoItem } from "../../api/todoApi";
import { TodoItemCard } from "../todoItemCard/TodoItemCard.component";

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
    return (
        <div>
            <div className="flex flex-col xl:w-full xl:grid xl:grid-cols-3 gap-5">
                {todoItems.map((todoItem) => {
                    return (
                        <TodoItemCard
                            data={todoItem}
                            onDeleteClick={onDeleteClick}
                            onDoneClick={onDoneClick}
                            key={todoItem.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};
