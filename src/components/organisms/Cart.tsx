import React, {
    Dispatch,
    startTransition,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    Action,
    Context,
    DispatchContext,
    actionTypes,
} from "../../context/store";
import { Cart } from "../../types/main";
import { CartItem } from "../molecules/CartItem";
import { FinalTotal } from "./FinalTotal";
import { Button } from "../atoms/Button";
import { useLocation } from "react-router-dom";

const CartComponent = React.memo(({}: {}) => {
    const { cart, total } = useContext(Context);
    const [checkout, setCheckout] = useState(false);
    const dispatch = useContext(DispatchContext) as Dispatch<Action>;
    const location = useLocation();
    const isCheckoutPage = location.pathname === "/checkout-page";

    useEffect(() => {
        startTransition(() => {
            dispatch({ type: actionTypes.RUNNING_TOTAL, payload: "" });
        });
    }, [cart, dispatch]);
    const handleClick = useCallback(() => {
        setCheckout(true);
    }, []);

    return cart.length ? (
        <div data-testid="cart">
            {cart.map((item) => {
                return <CartItem item={item} key={item.id} />;
            })}
            <div>
                Running Total: <p data-testid="total">{String(total)}</p>
            </div>
            {!isCheckoutPage && (
                <Button string="Checkout" handleClick={handleClick} />
            )}
            {checkout && <FinalTotal />}
        </div>
    ) : null;
});
export default CartComponent;
