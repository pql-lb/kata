import React, { useCallback, useState } from "react";
import { FetchData } from "../../hooks/FetchData";
import { Button } from "../atoms/Button";

export const Checkout = React.memo(() => {
    //refetch prices
    const { data } = FetchData(Date.now());

    return <div></div>;
});
