import { useForm } from "react-hook-form";
import * as z from "zod";
import classNames from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

export type TodoItemFormValues = {
    title: string;
    description: string;
    date: Date;
};

type TodoItemProps = {
    formTitle: string;
    inputPlaceholder: string;
    descriptionPlaceholder: string;
    onSubmit: SubmitHandler<TodoItemFormValues>;
};

const formSchema = z.object({
    title: z.string().min(1, { message: "Item title is required" }),
    description: z.string().min(1, { message: "Item description is required" }),
    date: z.coerce.date(),
});

export const TodoItemForm = ({
    formTitle,
    inputPlaceholder,
    descriptionPlaceholder,
    onSubmit,
}: TodoItemProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
    } = useForm<TodoItemFormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful, reset]);

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
                    className="input input-bordered"
                />
                {errors.description?.message && (
                    <p>{errors.description?.message}</p>
                )}
                <textarea
                    {...register("description")}
                    rows={5}
                    className="textarea textarea-bordered"
                    placeholder={descriptionPlaceholder}
                ></textarea>

                {errors.date?.message && <p>{errors.date?.message}</p>}
                <input
                    {...register("date")}
                    type="datetime-local"
                    className="input input-bordered"
                />

                <input type="submit" value="Save" />
            </form>
        </div>
    );
};
