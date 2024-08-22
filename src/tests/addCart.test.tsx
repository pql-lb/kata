import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DispatchContext, actionTypes } from "../context/store";
import { Cart, Structure } from "../types/main";
import { Product } from "../components/molecules/Product";
import { MockProvider, mockDispatch, state, state2 } from "./setupTests";
import { MainTemplate } from "../components/templates/Main";
import CartComponent from "../components/organisms/Cart";

const mockProduct: Structure = {
    id: "1",
    unitPrice: 10,
    specialPrice: {
        quantity: 2,
        price: 18,
    },
};

describe("Product Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the product name and id correctly", () => {
        render(
            <MockProvider state={state}>
                <Product product={mockProduct} index={0} />
            </MockProvider>
        );

        expect(screen.getByText("Apples")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    test("calls dispatch with the correct action on button click", () => {
        render(
            <MockProvider state={state}>
                <Product product={mockProduct} index={0} />
            </MockProvider>
        );

        fireEvent.click(screen.getByText("Add to Cart"));
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: actionTypes.UPDATE_CART,
            payload: mockProduct,
        });
    });

    test("renders all cart items correctly", async () => {
        const { rerender } = render(
            <MockProvider state={state}>
                <Product product={mockProduct} index={0} />
                <CartComponent />
            </MockProvider>
        );
        fireEvent.click(screen.getByText("Add to Cart"));
        fireEvent.click(screen.getByText("Add to Cart"));
        fireEvent.click(screen.getByText("Add to Cart"));

        expect(mockDispatch).toHaveBeenCalledTimes(3);

        rerender(
            <MockProvider state={state2}>
                <Product product={mockProduct} index={0} />
                <CartComponent />
            </MockProvider>
        );
        const quantity = screen.getByTestId("quantity");
        expect(quantity).toBeInTheDocument();
        expect(quantity).toHaveTextContent("3");
    });
});
