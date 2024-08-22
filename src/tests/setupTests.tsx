import "@testing-library/jest-dom";
import React, { ReactNode } from "react";
import {
    ContextProvider,
    Context,
    DispatchContext,
} from "../../src/context/store";

export const mockDispatch = jest.fn((action) => {});

export const MockProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const state = {
        prices: [
            {
                id: "A",
                unitPrice: 50,
                specialPrice: {
                    quantity: 3,
                    price: 130,
                },
            },
            {
                id: "B",
                unitPrice: 30,
                specialPrice: {
                    quantity: 2,
                    price: 45,
                },
            },
        ],
        cart: [],
    };
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
