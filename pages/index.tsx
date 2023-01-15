import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createNewTodoList,
    deleteTodoList,
    getTodoLists,
} from "../api/todoApi";

import { Modal } from "../components/common/Modal.component";
import {
    TodoListForm,
    TodoListFormValues,
} from "../components/forms/TodoListForm.component";
import { TodoListStack } from "../components/stack/TodoListsStack.component";

export default function Home() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { isLoading, isError, data } = useQuery("todoLists", getTodoLists);
    const [isModalOpened, setIsModalOpened] = useState(false);

    const createTodoListMutation = useMutation({
        mutationFn: createNewTodoList,
        onSuccess: (newTodoList) => {
            queryClient.setQueryData("todoLists", [
                ...(data ? data : []),
                newTodoList,
            ]);
        },
    });

    const deleteTodoListMutation = useMutation({
        mutationFn: deleteTodoList,
        onSuccess: (deletedTodoList) => {
            queryClient.setQueryData("todoLists", [
                ...(data ? data : []).filter(
                    (value) => value.id !== deletedTodoList.id
                ),
            ]);
        },
    });

    const onTodoListFormSubmit = (data: TodoListFormValues) => {
        createTodoListMutation.mutate(data);
        setIsModalOpened(false);
    };

    const handleDeleteTodoList = (todoListId: string) => {
        deleteTodoListMutation.mutate(todoListId);
    };

    const handleListClick = (todoListId: string) => {
        router.push(`./todolists/${todoListId}`);
    };
    return (
        <div className="flex h-full justify-start items-center flex-col gap-2 bg-black pt-10">
            <h1 className="font-bold text-6xl">Steps to get a job at</h1>
            <Image src="./amcef-logo.svg" alt="logo" width={295} height={102} />
            {isLoading && <div className="font-bold">Loading...</div>}
            {isError && (
                <div className="font-bold">
                    Error occured during getting data
                </div>
            )}
            <div className=" max-h-96  overflow-y-auto">
                {data && (
                    <TodoListStack
                        todoLists={data}
                        onDeleteList={handleDeleteTodoList}
                        onListClick={handleListClick}
                    />
                )}
            </div>
            <button
                className="btn bg-amcef-primary hover:bg-amcef-primary-hover text-amcef-black"
                onClick={() => setIsModalOpened(true)}
            >
                Create New Todo List
            </button>
            <Modal
                isOpen={isModalOpened}
                onClose={() => {
                    setIsModalOpened(false);
                }}
            >
                <TodoListForm
                    formTitle="New Todo List"
                    inputPlaceholder="Type title..."
                    onSubmit={onTodoListFormSubmit}
                />
            </Modal>
        </div>
    );
}
