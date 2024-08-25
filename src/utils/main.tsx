import { Cart, PricingRules } from "../types/main";

//calculates final or running total
export const calculateTotal = (cart: Cart[], useDiscounts: boolean) => {
    let total = 0;
    cart.forEach((item) => {
        const { count, unitPrice, specialPrice } = item;

        if (specialPrice && useDiscounts) {
            const { quantity, price } = specialPrice;
            const discounted = Math.floor(count / specialPrice.quantity);
            const leftOver = count % quantity;
            item.discounted = discounted;
            item.discountedPrice = discounted * price + leftOver * unitPrice;
            total += discounted * price;
            total += leftOver * unitPrice;
        } else {
            total += count * unitPrice;
        }
    });
    return total;
};
export const formatPrice = (
    amount: number,
    locale = "en-UK",
    currency = "GBP"
) => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(amount / 100);
};
