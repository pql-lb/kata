import React from "react";
import { formatPrice } from "../../utils/main";

export const PriceDisplay = React.memo(({ final }: { final: number }) => {
    return (
        <div className="cart__total">
            <p>
                Final Price: <span>{formatPrice(final)}</span>
            </p>
        </div>
    );
});
