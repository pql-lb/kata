import React from "react";
import { Cart } from "../../types/main";

export const CartItem = React.memo(({ item }: { item: Cart }) => {
    return (
        <div>
            cart item: {item.id}{" "}
            <div>
                Quantity: <p data-testid="quantity">{item.count}</p>
            </div>
        </div>
    );
});
