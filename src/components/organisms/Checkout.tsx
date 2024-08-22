import React, {
    Dispatch,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { FetchData } from "../../hooks/FetchData";
import { Button } from "../atoms/Button";
import {
    Action,
    Context,
    DispatchContext,
    actionTypes,
} from "../../context/store";
import { Cart, Structure } from "../../types/main";

export const Checkout = React.memo(() => {
    //refetch prices
    const { total, final, cart } = useContext(Context);
    const dispatch = useContext(DispatchContext) as Dispatch<Action>;
    const { data } = FetchData(Date.now());

    useEffect(() => {
        if (data) {
            const updatedPrices: Record<string, Structure> = {};
            data.forEach((item: Structure) => {
                updatedPrices[item.id] = item;
            });

            const updatedCart = cart.map((cartItem) => {
                const latestPrice = updatedPrices[cartItem.id];
                if (latestPrice) {
                    const newItem = cartItem;
                    newItem.unitPrice = latestPrice.unitPrice;
                    newItem.specialPrice = latestPrice.specialPrice;
                    return newItem;
                }

                return cartItem;
            });

            dispatch({ type: actionTypes.REPLACE_CART, payload: updatedCart });
            dispatch({ type: actionTypes.FINAL_TOTAL, payload: updatedCart });
        }
    }, [data]);
    //when final has value redirect to checkout
    return <div>{final && <div>Final Total: {String(final)}</div>}</div>;
});
