import React, { useContext, useEffect, useState } from "react";
import { Action, Context } from "../../context/store";
import { useNavigate } from "react-router-dom";
import { CalculateTotal } from "../../hooks/CalculateTotal";
import { formatPrice } from "../../utils/main";
import { PriceDisplay } from "../molecules/PriceDisplay";

export const FinalTotal = React.memo(() => {
    const navigate = useNavigate();
    const { final } = useContext(Context);
    CalculateTotal();
    useEffect(() => {
        //when final has value redirect to checkout
        if (final !== undefined) {
            navigate("/checkout-page", { state: { final } });
        }
    }, [final, navigate]);

    return <>{final && <PriceDisplay final={final} />}</>;
});
