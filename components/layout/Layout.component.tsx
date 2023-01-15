import Link from "next/link";

type LayoutProps = {
    children: React.ReactNode | React.ReactNode[];
};

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="p-3 w-screen h-screen flex flex-col justify-between overflow-hidden">
            <div>
                <Link href="/" className=" uppercase font-bold text-xl">
                    Home
                </Link>
            </div>
            {children}
            <div className="flex justify-end items-end">
                <span className="mr-2">Created by:</span>
                <span className="font-bold"> Marek Matušica </span>
            </div>
        </div>
    );
};
