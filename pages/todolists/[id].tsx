import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createNewTodoItem,
    getTodoItemsForTodoList,
    getTodoList,
} from "../../api/todoApi";

import {
    TodoItemForm,
    TodoItemFormValues,
} from "../../components/forms/TodoItemForm.component";
import { Modal } from "../../components/common/Modal.component";
import { TodoItemsStack } from "../../components/stack/TodoItemsStack.component";

const TodoList = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { id } = router.query;

    const [isModalOpened, setIsModalOpened] = useState(false);

    const listQuery = useQuery(["todo-list", id], () => getTodoList(id));
    const todoItemsQuery = useQuery(["todo-list", id, "todo-items"], () =>
        getTodoItemsForTodoList(id)
    );

    const createTodoItem = useMutation({
        mutationFn: createNewTodoItem,
        onSuccess: (newTodoItem) => {
            queryClient.setQueryData(
                ["todo-list", id, "todo-items"],
                [
                    ...(todoItemsQuery.data ? todoItemsQuery.data : []),
                    newTodoItem,
                ]
            );
        },
    });

    const handleTodoItemFormSubmit = (data: TodoItemFormValues) => {
        createTodoItem.mutate({
            itemData: { ...data, isFinished: false },
            todoListId: id as string,
        });
        setIsModalOpened(false);
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-start items-center">
            <h1 className=" text-6xl">
                <span>Don`t forget about: </span>
                <span>{listQuery.data?.title || "Loading..."}</span>
            </h1>
            <TodoItemsStack todoItems={todoItemsQuery.data || []} />
            <button
                className="btn bg-amcef-primary hover:bg-amcef-primary-hover text-amcef-black"
                onClick={() => setIsModalOpened(true)}
            >
                Create New Todo Item
            </button>
            <Modal
                isOpen={isModalOpened}
                onClose={() => {
                    setIsModalOpened(false);
                }}
            >
                <TodoItemForm
                    formTitle="Create new To Do item"
                    descriptionPlaceholder="Type the description..."
                    inputPlaceholder="Type the title..."
                    onSubmit={handleTodoItemFormSubmit}
                />
            </Modal>
        </div>
    );
};

export default TodoList;
