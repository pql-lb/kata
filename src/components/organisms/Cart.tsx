import React, { Dispatch, startTransition, useContext, useEffect } from "react";
import {
    Action,
    Context,
    DispatchContext,
    actionTypes,
} from "../../context/store";
import { Cart } from "../../types/main";
import { CartItem } from "../molecules/CartItem";

const CartComponent = React.memo(({}: {}) => {
    const { cart } = useContext(Context);
    const dispatch = useContext(DispatchContext) as Dispatch<Action>;
    useEffect(() => {
        startTransition(() => {
            console.log("here");
            dispatch({ type: actionTypes.RUNNING_TOTAL, payload: "" });
        });
    }, [cart, dispatch]);
    return cart.length ? (
        <div data-testid="cart">
            {cart.map((item) => {
                return <CartItem item={item} key={item.id} />;
            })}
        </div>
    ) : null;
});
export default CartComponent;
