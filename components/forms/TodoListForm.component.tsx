import { useForm } from "react-hook-form";
import * as z from "zod";
import classNames from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";

export type TodoListFormValues = {
    title: string;
};

type TodoListProps = {
    formTitle: string;
    inputPlaceholder: string;
    onSubmit: SubmitHandler<TodoListFormValues>;
};

const formSchema = z.object({
    title: z.string().min(1, { message: "Form title is required" }),
});

export const TodoListForm = ({
    formTitle,
    inputPlaceholder,
    onSubmit,
}: TodoListProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TodoListFormValues>({
        resolver: zodResolver(formSchema),
    });

    return (
        <div className={classNames("transition-height")}>
            <h3 className="text-4xl mb-5">{formTitle}</h3>

            <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                {errors.title?.message && <p>{errors.title?.message}</p>}
                <input
                    {...register("title")}
                    type="text"
                    placeholder={inputPlaceholder}
                    className="input input-bordered w-full max-w-xs"
                />
                <input type="submit" value="Save" />
            </form>
        </div>
    );
};
