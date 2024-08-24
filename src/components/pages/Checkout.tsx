import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CalculateTotal } from "../../hooks/CalculateTotal";
import { CheckoutCalc } from "../molecules/CheckoutCalc";
import { PriceDisplay } from "../molecules/PriceDisplay";
import { Context } from "../../context/store";

const Checkout = React.memo(() => {
    const location = useLocation();
    const { final } = location.state || {};

    return final ? <PriceDisplay final={final} /> : <CheckoutCalc />;
});

export default Checkout;
