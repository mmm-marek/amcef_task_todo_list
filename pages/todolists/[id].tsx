import { useState } from "react";
import {
    useMutation,
    useQuery,
    useQueryClient,
    QueryClient,
    dehydrate,
    DehydratedState,
} from "react-query";
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
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

type TodoListProps = {
    id: string;
};

const TodoList = ({ id }: TodoListProps) => {
    const queryClient = useQueryClient();

    const [isModalOpened, setIsModalOpened] = useState(false);
    const [todoItems, setTodoItems] = useState([] as TodoItem[]);

    const listQuery = useQuery(["todo-list", id], () => getTodoList(id));
    const todoItemsQuery = useQuery({
        queryKey: ["todo-list", id, "todo-items"],
        queryFn: () => getTodoItemsForTodoList(id),
        onSuccess: (data) => {
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

    console.log("list-query", listQuery.isLoading);
    console.log("todoitems", todoItemsQuery.isLoading);

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
        if (!todoItemsQuery.data) {
            return;
        }
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
        <div className="flex flex-col justify-start items-center">
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

interface TodoListServerSideProps extends ParsedUrlQuery {
    id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as TodoListServerSideProps;

    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.fetchQuery(["todo-list", id], () => getTodoList(id)),
        queryClient.fetchQuery(["todo-list", id, "todo-items"], () =>
            getTodoItemsForTodoList(id)
        ),
    ]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id,
        },
    };
};

export default TodoList;
