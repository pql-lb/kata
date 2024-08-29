import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DispatchContext, actionTypes } from "../context/store";
import { Cart, Structure } from "../types/main";
import { Product } from "../components/molecules/Product";
import { MockProvider, mockDispatch, state, state2 } from "./setupTests";
import { MainTemplate } from "../components/templates/Main";
import CartComponent from "../components/organisms/Cart";
import { MemoryRouter } from "react-router-dom";

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
            <MemoryRouter>
                <MockProvider state={state}>
                    <Product product={mockProduct} index={0} />
                </MockProvider>
            </MemoryRouter>
        );

        expect(screen.getByText("1")).toBeInTheDocument();
    });

    test("calls dispatch with the correct action on button click", () => {
        render(
            <MemoryRouter>
                <MockProvider state={state}>
                    <Product product={mockProduct} index={0} />
                </MockProvider>
            </MemoryRouter>
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
            <MemoryRouter>
                <MockProvider state={state}>
                    <Product product={mockProduct} index={0} />
                    <CartComponent />
                </MockProvider>
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText("Add to Cart"));
        fireEvent.click(screen.getByText("Add to Cart"));
        fireEvent.click(screen.getByText("Add to Cart"));

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
