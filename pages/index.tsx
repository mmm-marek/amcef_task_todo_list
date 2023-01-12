import Head from "next/head";

import { Modal } from "../components/common/Modal.component";
import {
    TodoItemForm,
    TodoItemFormValues,
} from "../components/forms/TodoItemForm.component";
import {
    TodoListForm,
    TodoListFormValues,
} from "../components/forms/TodoListForm.component";

export default function Home() {
    const onTodoItemFormSubmit = (data: TodoItemFormValues) => {
        console.log(data);
    };

    const onTodoListFormSubmit = (data: TodoListFormValues) => {
        console.log(data);
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
            <main className="w-screen h-screen bg-black">
                <Modal id="modal1" label="Open ToDo Item Modal">
                    <TodoItemForm
                        formTitle="New Todo Item"
                        inputPlaceholder="Type title..."
                        descriptionPlaceholder="Type description..."
                        onSubmit={onTodoItemFormSubmit}
                    />
                </Modal>
                <Modal id="modal2" label="Open ToDo List Modal">
                    <TodoListForm
                        formTitle="New Todo List"
                        inputPlaceholder="Type title..."
                        onSubmit={onTodoListFormSubmit}
                    />
                </Modal>
            </main>
        </>
    );
}
