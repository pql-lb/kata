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
        <div>
            cart item: {item.id}{" "}
            <div>
                <p>
                    Quantity: <span data-testid="quantity">{item.count}</span>
                </p>
            </div>
            <Button string="X" handleClick={handleClick} />
        </div>
    );
});
