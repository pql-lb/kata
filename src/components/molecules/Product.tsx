import React, { useCallback, useContext } from "react";
import { Structure } from "../../types/main";
import { DispatchContext, actionTypes } from "../../context/store";
import { Button } from "../atoms/Button";

type Props = {
    product: Structure;
    index: number;
};

export const Product = React.memo(({ product, index }: Props) => {
    const { id } = product;
    const dispatch = useContext(DispatchContext);
    const handleClick = useCallback(() => {
        if (dispatch) {
            dispatch({ type: actionTypes.UPDATE_CART, payload: product });
        }
    }, [dispatch]);
    return (
        <>
            <div className="product">
                <p className="product__title">{id}</p>
                <Button string="Add to Cart" handleClick={handleClick} />
            </div>
        </>
    );
});
