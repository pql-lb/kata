import React, { useCallback, useContext } from "react";
import { Cart } from "../../types/main";
import { Button } from "../atoms/Button";
import { DispatchContext, actionTypes } from "../../context/store";

export const CartItem = React.memo(({ item }: { item: Cart }) => {
    const dispatch = useContext(DispatchContext);
    const handleClick = useCallback(() => {
        if (dispatch) {
            dispatch({ type: actionTypes.REMOVE_ITEM, payload: item.id });
        }
    }, [dispatch]);
    return (
        <div className="cart__item">
            {" "}
            <Button
                className="cart__delete"
                string="X"
                handleClick={handleClick}
            />
            <h2 className="cart__title">cart item: {item.id}</h2>
            <div className="cart__amount">
                <p>
                    Quantity: <span data-testid="quantity">{item.count}</span>
                </p>
            </div>
        </div>
    );
});
