import React, { useContext } from "react";
import { Context } from "../../context/store";
import { Cart } from "../../types/main";
import { CartItem } from "../molecules/CartItem";

const CartComponent = React.memo(({}: {}) => {
    const { cart } = useContext(Context);

    return cart.length ? (
        <div data-testid="cart">
            {cart.map((item) => {
                return <CartItem item={item} key={item.id} />;
            })}
        </div>
    ) : null;
});
export default CartComponent;
