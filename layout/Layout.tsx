import Link from "next/link";
type LayoutProps = {
    children: React.ReactNode | React.ReactNode[];
};
export const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <div>
                <Link href="/">Home</Link>
            </div>
            {children}
            <div>
                Created by: <span> Marek Matušica </span>
            </div>
        </div>
    );
};
