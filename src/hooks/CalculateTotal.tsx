import { Dispatch, useContext, useEffect } from "react";
import {
    Action,
    Context,
    DispatchContext,
    actionTypes,
} from "../context/store";
import { Structure } from "../types/main";
import { FetchData } from "./FetchData";

export const CalculateTotal = () => {
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
    return data;
};
