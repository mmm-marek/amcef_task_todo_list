import { useRouter } from "next/router";

const TodoList = () => {
    const router = useRouter();
    const { id } = router.query;

    return <h1>TODO LIST {id}</h1>;
};

export default TodoList;
