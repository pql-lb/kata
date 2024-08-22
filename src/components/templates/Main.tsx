import { ReactNode, lazy, useContext } from "react";
import { Context } from "../../context/store";
const CartComponent = lazy(() => import("../organisms/Cart"));

export const MainTemplate = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <CartComponent />
            <main className="main">{children}</main>
        </>
    );
};
