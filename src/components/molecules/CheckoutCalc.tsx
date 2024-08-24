import React, { Dispatch, useContext } from "react";
import { CalculateTotal } from "../../hooks/CalculateTotal";
import { Action, Context, DispatchContext } from "../../context/store";
import { PriceDisplay } from "./PriceDisplay";

export const CheckoutCalc = React.memo(() => {
    const { final } = useContext(Context);

    CalculateTotal();
    return <PriceDisplay final={final} />;
});
