import axios from "axios";
import { TodoListFormValues } from "../components/forms/TodoListForm.component";
import { TodoItemFormValues } from "../components/forms/TodoItemForm.component";

export type TodoList = { id: string; title: string };

export type TodoItem = TodoItemFormValues & { isFinished: boolean; id: string };

export const getTodoLists = async (): Promise<TodoList[]> => {
    const res = await axios.get(
        "https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists"
    );
    return res.data;
};

export const deleteTodoList = async (todoListId: string): Promise<TodoList> => {
    const res = await axios.delete(
        `https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists/${todoListId}`
    );
    return res.data;
};

export const getTodoList = async (todoListId: string): Promise<TodoList> => {
    const res = await axios.get(
        `https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists/${todoListId}`
    );
    return res.data;
};

export const getTodoItemsForTodoList = async (
    todoListId: string
): Promise<TodoItem[]> => {
    const res = await axios.get(
        `https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists/${todoListId}/todo-items`
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

type NewTodoItemApiData = {
    itemData: TodoItemFormValues & { isFinished: boolean };
    todoListId: string;
};

export const createNewTodoItem = async (
    data: NewTodoItemApiData
): Promise<TodoItem> => {
    const res = await axios.post(
        `https://63beeddd585bedcb36bae16d.mockapi.io/api/todo-lists/${data.todoListId}/todo-items`,
        data.itemData
    );
    return res.data;
};

export const updateTodoItem = async (
    newItemData: TodoItem,
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
