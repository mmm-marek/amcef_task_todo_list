import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createNewTodoItem,
    getTodoItemsForTodoList,
    getTodoList,
    updateTodoItem,
    deleteTodoItem,
    TodoItem,
} from "../../api/todoApi";

import {
    TodoItemForm,
    TodoItemFormValues,
} from "../../components/forms/TodoItemForm.component";
import { Modal } from "../../components/common/Modal.component";
import { TodoItemsStack } from "../../components/stack/TodoItemsStack.component";
import {
    FilterRadioType,
    FilterSection,
} from "../../components/filterSection/FilterSection.component";
import { isOverdue } from "../../utils/isOverdue";

const TodoList = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { id } = router.query;

    const [isModalOpened, setIsModalOpened] = useState(false);
    const [todoItems, setTodoItems] = useState([] as TodoItem[]);

    const listQuery = useQuery(["todo-list", id], () => getTodoList(id));
    const todoItemsQuery = useQuery({
        queryKey: ["todo-list", id, "todo-items"],
        queryFn: () => getTodoItemsForTodoList(id),
        onSuccess: (data) => {
            console.log("refresh");
            setTodoItems(data);
        },
    });
    const createTodoItemMutation = useMutation({
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

    const updateItemMutation = useMutation({
        mutationFn: updateTodoItem,
        onSuccess: (updatedTodoItem) => {
            queryClient.setQueryData(
                ["todo-list", id, "todo-items"],
                [
                    ...(todoItemsQuery.data ? todoItemsQuery.data : []).map(
                        (item) =>
                            item.id === updatedTodoItem.id
                                ? updatedTodoItem
                                : item
                    ),
                ]
            );
        },
    });

    const deleteItemMutation = useMutation({
        mutationFn: deleteTodoItem,
        onSuccess: (deletedTodoItem) => {
            queryClient.setQueryData(
                ["todo-list", id, "todo-items"],
                [
                    ...(todoItemsQuery.data ? todoItemsQuery.data : []).filter(
                        (item) => item.id !== deletedTodoItem.id
                    ),
                ]
            );
        },
    });

    const handleTodoItemFormSubmit = (data: TodoItemFormValues) => {
        createTodoItemMutation.mutate({
            itemData: { ...data, isFinished: false },
            todoListId: id as string,
        });
        setIsModalOpened(false);
    };

    const handleDoneClick = (todoItem: TodoItem) => {
        updateItemMutation.mutate({
            newItemData: { ...todoItem, isFinished: true },
            todoItemId: todoItem.id,
            todoListId: id as string,
        });
    };

    const handleDeleteClick = (todoItemId: string) => {
        deleteItemMutation.mutate({ todoItemId, todoListId: id as string });
    };

    const handleFilterChange = (
        searchValue: string,
        filterRadioType: FilterRadioType
    ) => {
        setTodoItems([
            ...todoItemsQuery.data.filter((todoItem) => {
                if (!todoItem.title.includes(searchValue)) {
                    return false;
                }
                const isTodoOverdue = isOverdue(new Date(todoItem.date));

                if (
                    filterRadioType === "Active" &&
                    (todoItem.isFinished || isTodoOverdue)
                ) {
                    return false;
                }
                if (filterRadioType === "Done" && !todoItem.isFinished) {
                    return false;
                }
                if (
                    filterRadioType === "Overdue" &&
                    (!isTodoOverdue || todoItem.isFinished)
                ) {
                    return false;
                }
                return true;
            }),
        ]);
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-start items-center">
            <h1 className=" text-6xl">
                <span>Don`t forget about: </span>
                <span>{listQuery.data?.title || "Loading..."}</span>
            </h1>
            <FilterSection onChange={handleFilterChange} />
            <TodoItemsStack
                todoItems={todoItems}
                onDeleteClick={handleDeleteClick}
                onDoneClick={handleDoneClick}
            />
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
