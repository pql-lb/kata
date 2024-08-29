import React, { useCallback, useContext } from "react";
import { Structure } from "../../types/main";
import { DispatchContext, actionTypes } from "../../context/store";
import { Button } from "../atoms/Button";
import { formatPrice } from "../../utils/main";

type Props = {
    product: Structure;
    index: number;
};

export const Product = React.memo(({ product, index }: Props) => {
    const { id, unitPrice, specialPrice } = product;
    const dispatch = useContext(DispatchContext);
    const handleClick = useCallback(() => {
        if (dispatch) {
            dispatch({ type: actionTypes.UPDATE_CART, payload: product });
        }
    }, [dispatch]);

    return (
        <>
            <div className="product">
                <h2 className="product__title">{id}</h2>
                <p className="product__price">{formatPrice(unitPrice)}</p>
                {specialPrice ? (
                    <p className="product__discount">
                        Buy {specialPrice.quantity} for{" "}
                        {formatPrice(specialPrice.price)}
                    </p>
                ) : (
                    <></>
                )}
                <Button string="Add to Cart" handleClick={handleClick} />
            </div>
        </>
    );
});
