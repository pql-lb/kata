import React, { useContext } from "react";
import { Context } from "../../context/store";
import { Cart } from "../../types/main";
import { CartItem } from "../molecules/CartItem";

const CartComponent = React.memo(({}: {}) => {
    const { cart } = useContext(Context);
    console.log(cart);
    return cart.length ? (
        <>
            {cart.map((item) => {
                return <CartItem item={item} key={item.id} />;
            })}
        </>
    ) : null;
});
export default CartComponent;
