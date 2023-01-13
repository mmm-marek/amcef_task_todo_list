import Head from "next/head";
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
    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery("todoLists", getTodoLists);

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
    };

    const handleDeleteTodoList = (todoListId: string) => {
        deleteTodoListMutation.mutate(todoListId);
    };
    return (
        <>
            <Head>
                <title>Amcef ToDo List</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/amcef_fav.webp" />
            </Head>
            <div className="w-screen h-screen bg-black">
                {isLoading && <div>Loading...</div>}
                {isError && <div>Error occured</div>}
                {data && (
                    <TodoListStack
                        todoLists={data}
                        onDeleteList={handleDeleteTodoList}
                    />
                )}
                {/* <Modal id="modal1" label="Open ToDo Item Modal">
                    <TodoItemForm
                        formTitle="New Todo Item"
                        inputPlaceholder="Type title..."
                        descriptionPlaceholder="Type description..."
                        onSubmit={onTodoItemFormSubmit}
                    />
                </Modal> */}
                <Modal id="modal2" label="Open ToDo List Modal">
                    <TodoListForm
                        formTitle="New Todo List"
                        inputPlaceholder="Type title..."
                        onSubmit={onTodoListFormSubmit}
                    />
                </Modal>
            </div>
        </>
    );
}
