import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DispatchContext, actionTypes } from "../context/store";
import { Structure } from "../types/main";
import { Product } from "../components/molecules/Product";
import { MockProvider, mockDispatch } from "./setupTests";

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
            <MockProvider>
                <Product product={mockProduct} index={0} />
            </MockProvider>
        );

        expect(screen.getByText("Apples")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    test("calls dispatch with the correct action on button click", () => {
        render(
            <MockProvider>
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
});
