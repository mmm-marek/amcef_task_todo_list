import { useState } from "react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
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
import { TodoItemsStack } from "../../components/stacks/TodoItemsStack.component";
import {
    FilterCategory,
    FilterSection,
} from "../../components/filterSection/FilterSection.component";
import { isOverdue } from "../../utils/isOverdue";

type TodoListProps = {
    todoListId: string;
    todoListTitle: string;
    initialTodoItems: TodoItem[];
};

const TodoList = ({
    todoListId,
    todoListTitle,
    initialTodoItems,
}: TodoListProps) => {
    const queryClient = useQueryClient();

    const [todoItems, setTodoItems] = useState([] as TodoItem[]);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedFilterCategory, setSelectedFilterCategory] = useState(
        "All" as FilterCategory
    );

    const todoItemsQuery = useQuery({
        queryKey: ["todo-list", todoListId, "todo-items"],
        queryFn: () => getTodoItemsForTodoList(todoListId),
        onSuccess: (data) => {
            setTodoItems(
                createFilteredTodoItems(
                    data,
                    searchValue,
                    selectedFilterCategory
                )
            );
        },
        initialData: initialTodoItems,
    });

    const createTodoItemMutation = useMutation({
        mutationFn: createNewTodoItem,
        onSuccess: (newTodoItem) => {
            queryClient.setQueryData(
                ["todo-list", todoListId, "todo-items"],
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
                ["todo-list", todoListId, "todo-items"],
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
                ["todo-list", todoListId, "todo-items"],
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
            todoListId: todoListId,
        });
        setIsModalOpened(false);
    };

    const handleDoneClick = (todoItem: TodoItem) => {
        updateItemMutation.mutate({
            newItemData: { ...todoItem, isFinished: true },
            todoItemId: todoItem.id,
            todoListId: todoListId,
        });
    };

    const handleDeleteClick = (todoItemId: string) => {
        deleteItemMutation.mutate({ todoItemId, todoListId: todoListId });
    };

    const createFilteredTodoItems = (
        todoItems: TodoItem[],
        searchValue: string,
        filterCategory: FilterCategory
    ): TodoItem[] => [
        ...todoItems.filter((todoItem) => {
            if (
                !todoItem.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            ) {
                return false;
            }

            const isTodoOverdue = isOverdue(new Date(todoItem.date));

            if (
                filterCategory === "Active" &&
                (todoItem.isFinished || isTodoOverdue)
            ) {
                return false;
            }
            if (filterCategory === "Done" && !todoItem.isFinished) {
                return false;
            }
            if (
                filterCategory === "Overdue" &&
                (!isTodoOverdue || todoItem.isFinished)
            ) {
                return false;
            }
            return true;
        }),
    ];

    const handleSearchChange = (newSearchValue: string) => {
        setSearchValue(newSearchValue);
        if (!todoItemsQuery.data) {
            return;
        }
        setTodoItems(
            createFilteredTodoItems(
                todoItemsQuery.data,
                newSearchValue,
                selectedFilterCategory
            )
        );
    };

    const handleCategoryChange = (newFilterCategory: FilterCategory) => {
        setSelectedFilterCategory(newFilterCategory);
        if (!todoItemsQuery.data) {
            return;
        }
        setTodoItems(
            createFilteredTodoItems(
                todoItemsQuery.data,
                searchValue,
                newFilterCategory
            )
        );
    };

    return (
        <div className="h-full pt-10 flex flex-col justify-start items-center gap-5">
            <h1 className="text-2xl  xl:text-6xl">
                <span className="mr-2">Step:</span>
                <span className="font-bold">{todoListTitle}</span>
            </h1>
            <FilterSection
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                selectedFilterCategory={selectedFilterCategory}
            />
            <div className="xl:max-h-110 overflow-y-auto">
                <TodoItemsStack
                    todoItems={todoItems}
                    onDeleteClick={handleDeleteClick}
                    onDoneClick={handleDoneClick}
                />
            </div>
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
                    formTitle="Create New ToDo Item"
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

    // This part should be implemented with react-query and hydration,
    // however, Netlify does not support it.
    const todoList = await getTodoList(id);
    const todoItems = await getTodoItemsForTodoList(id);

    return {
        props: {
            todoListId: id,
            todoListTitle: todoList.title,
            initialTodoItems: todoItems,
        },
    };
};

export default TodoList;
