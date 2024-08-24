import React, { useContext } from "react";
import { CalculateTotal } from "../../hooks/CalculateTotal";
import { Context } from "../../context/store";
import { PriceDisplay } from "./PriceDisplay";

export const CheckoutCalc = React.memo(() => {
    const { final } = useContext(Context);
    CalculateTotal();
    return <PriceDisplay final={final} />;
});
