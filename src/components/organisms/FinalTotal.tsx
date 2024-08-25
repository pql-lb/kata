import React, { useContext, useEffect, useState } from "react";
import { Action, Context } from "../../context/store";
import { useNavigate } from "react-router-dom";
import { CalculateTotal } from "../../hooks/CalculateTotal";
import { formatPrice } from "../../utils/main";
import { PriceDisplay } from "../molecules/PriceDisplay";

export const FinalTotal = React.memo(() => {
    const navigate = useNavigate();
    const { final } = useContext(Context);
    const [loading, setLoading] = useState(true);

    CalculateTotal(setLoading);
    useEffect(() => {
        //when final has value redirect to checkout
        if (final !== undefined && !loading) {
            navigate("/checkout-page", { state: { final } });
        }
    }, [final, navigate, loading]);

    return <></>;
});
