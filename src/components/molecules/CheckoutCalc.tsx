import React, { Dispatch, useContext, useState } from "react";
import { CalculateTotal } from "../../hooks/CalculateTotal";
import { Action, Context, DispatchContext } from "../../context/store";
import { PriceDisplay } from "./PriceDisplay";

export const CheckoutCalc = React.memo(() => {
    const { final } = useContext(Context);
    const [loading, setLoading] = useState(true);

    CalculateTotal(setLoading);

    return !loading ? <PriceDisplay final={final} /> : null;
});
