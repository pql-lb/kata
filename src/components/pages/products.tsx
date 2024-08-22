import React from "react";
import { FetchData } from "../../hooks/FetchData";

const Products = React.memo(() => {
    FetchData();
    return <div>Products</div>;
});

export default Products;
