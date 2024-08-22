import React, { useCallback, useContext } from "react";
import { Context } from "../../context/store";
import { Structure } from "../../types/main";
import { Product } from "../molecules/Product";

const List = React.memo(() => {
    const { prices } = useContext(Context);

    return prices ? (
        <div>
            {prices.map((item: Structure, index) => {
                return <Product key={item.id} product={item} index={index} />;
            })}
        </div>
    ) : null;
});
export default List;
