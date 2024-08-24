import React, { useContext } from "react";
import { formatPrice } from "../../utils/main";
import { Context } from "../../context/store";

export const PriceDisplay = React.memo(({ final }: { final: number }) => {
    const { cart, discounts_applied } = useContext(Context);
    return (
        <div className="wrapper checkout">
            <div>
                {cart.map((item) => {
                    return (
                        <div key={"summary" + item.id} className="summary">
                            <h2 className="summary__title">{item.id}</h2>
                            <p className="summary__quantity">
                                Number of items: {item.count}
                            </p>
                            {item.discountedPrice ? (
                                <p className="summary__price--discount">
                                    Item Total:{" "}
                                    <span>
                                        {" "}
                                        {formatPrice(
                                            item.unitPrice * item.count
                                        )}{" "}
                                    </span>
                                    {formatPrice(item.discountedPrice)}
                                </p>
                            ) : (
                                <p className="summary__price">
                                    Item Total:{" "}
                                    {formatPrice(item.unitPrice * item.count)}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="cart__total">
                <p>
                    Final Price: <span>{formatPrice(final)}</span>
                </p>
            </div>
        </div>
    );
});
