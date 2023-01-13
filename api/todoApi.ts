import axios from "axios";
import { TodoListFormValues } from "../components/forms/TodoListForm.component";
import { TodoItemFormValues } from "../components/forms/TodoItemForm.component";

export type TodoList = { id: string; title: string };

export const getTodoLists = async (): Promise<TodoList[]> => {
    const res = await axios.get(
        "https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists"
    );
    return res.data;
};

export const createNewTodoList = async (
    data: TodoListFormValues
): Promise<TodoList> => {
    const res = await axios.post(
        "https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists",
        data
    );
    return res.data;
};

export const deleteTodoList = async (todoListId: string): Promise<TodoList> => {
    const res = await axios.delete(
        `https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists/${todoListId}`
    );
    return res.data;
};

export const getTodoItemsForTodoList = async (todoListId: string) => {
    const res = await axios.get(
        `https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists/${todoListId}/todo-items`
    );
    return res;
};

type TodoItemApiType = TodoItemFormValues & { isFinished: boolean };

export const createNewTodoItem = async (
    itemData: TodoItemApiType,
    todoListId: string
) => {
    const res = await axios.post(
        `https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists/${todoListId}/todo-items`,
        itemData
    );
    return res;
};

export const updateTodoItem = async (
    newItemData: TodoItemApiType,
    todoItemId: string,
    todoListId: string
) => {
    const res = await axios.put(
        `https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists/${todoListId}/todo-items/${todoItemId}`,
        newItemData
    );
    return res;
};

export const deleteTodoItem = async (
    todoItemId: string,
    todoListId: string
) => {
    const res = await axios.delete(
        `https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists/${todoListId}/todo-items/${todoItemId}`
    );
    return res;
};