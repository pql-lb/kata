import React, { lazy } from "react";
import { FetchData } from "../../hooks/FetchData";
const List = lazy(() => import("../organisms/List"));

const Products = React.memo(() => {
    const { data } = FetchData();

    return data ? <List /> : null;
});

export default Products;
