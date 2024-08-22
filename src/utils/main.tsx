import { Cart, PricingRules } from "../types/main";

export const calculateTotal = (cart: Cart[]): any => {
    let total = 0;
    cart.forEach((item) => {
        const { count, unitPrice, specialPrice } = item;

        if (specialPrice) {
            const { quantity, price } = specialPrice;
            const discounted = Math.floor(count / specialPrice.quantity);
            const leftOver = count % quantity;
            total += discounted * price;
            total += leftOver * unitPrice;
        } else {
            total += count * unitPrice;
        }
    });
    return total;
};
