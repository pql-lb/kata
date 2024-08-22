import "@testing-library/jest-dom";
import React, { ReactNode } from "react";
import {
    ContextProvider,
    Context,
    DispatchContext,
} from "../../src/context/store";
import { Cart } from "../types/main";

export const mockDispatch = jest.fn((action) => {});

export const state = {
    prices: [
        {
            id: "A",
            unitPrice: 50,
            specialPrice: {
                quantity: 3,
                price: 130,
            },
        },
    ],
    cart: [
        {
            id: "A",
            unitPrice: 50,
            specialPrice: {
                quantity: 3,
                price: 130,
            },
            count: 1,
        },
    ],
};

export const state2 = {
    prices: [
        {
            id: "A",
            unitPrice: 50,
            specialPrice: {
                quantity: 3,
                price: 130,
            },
        },
    ],
    cart: [
        {
            id: "A",
            unitPrice: 50,
            specialPrice: {
                quantity: 3,
                price: 130,
            },
            count: 3,
        },
    ],
};
export const MockProvider: React.FC<{ children: ReactNode; state: any }> = ({
    children,
    state,
}) => {
    return (
        <Context.Provider value={state}>
            <DispatchContext.Provider value={mockDispatch}>
                {children}
            </DispatchContext.Provider>
        </Context.Provider>
    );
};

afterEach(() => {
    jest.clearAllMocks();
});
