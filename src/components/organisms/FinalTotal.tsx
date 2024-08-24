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
import { useNavigate } from "react-router-dom";
import { CalculateTotal } from "../../hooks/CalculateTotal";

export const FinalTotal = React.memo(() => {
    const navigate = useNavigate();
    const { total, final, cart } = useContext(Context);
    CalculateTotal();
    useEffect(() => {
        //when final has value redirect to checkout
        if (final !== undefined) {
            navigate("/checkout-page", { state: { final } });
        }
    }, [final, navigate]);

    return <div>{final && <div>Final Total: {String(final)}</div>}</div>;
});
