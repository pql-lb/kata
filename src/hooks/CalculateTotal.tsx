import { Dispatch, useContext, useEffect } from "react";
import {
    Action,
    Context,
    DispatchContext,
    actionTypes,
} from "../context/store";
import { Structure } from "../types/main";
import { FetchData } from "./FetchData";

//Updates cart with newly fetched data
export const CalculateTotal = (callback: (isComplete: boolean) => void) => {
    const { cart } = useContext(Context);
    const dispatch = useContext(DispatchContext) as Dispatch<Action>;
    const { data } = FetchData(Date.now());

    useEffect(() => {
        if (data && data.length) {
            const updatedPrices = data.reduce<Record<string, Structure>>(
                (acc, item) => {
                    acc[item.id] = item;
                    return acc;
                },
                {}
            );

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

            callback(false);
        }
    }, [data]);
};
