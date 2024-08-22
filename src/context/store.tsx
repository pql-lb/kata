import React, {
    createContext,
    useReducer,
    useEffect,
    Reducer,
    Dispatch,
    ReactNode,
} from "react";
import { Cart, Structure } from "../types/main";
import { calculateTotal } from "../utils/main";

const initialState = {
    prices: [],
    cart: [],
    total: 0,
};
export interface State {
    prices: Structure[];
    cart: Cart[];
    total: Number;
}

export interface Action {
    type: string;
    payload?: any;
}
export const actionTypes = {
    UPDATE_PRICES: "UPDATE_PRICES",
    UPDATE_CART: "UPDATE_CART",
    RUNNING_TOTAL: "RUNNING_TOTAL",
};
const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PRICES:
            return { ...state, prices: action.payload };
        case actionTypes.RUNNING_TOTAL:
            const total = calculateTotal(state.cart);
            return { ...state, total };
        case actionTypes.UPDATE_CART:
            const existingProductIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingProductIndex !== -1) {
                const updatedCart = state.cart.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, count: item.count + 1 }
                        : item
                );
                return { ...state, cart: updatedCart };
            }

            const newCart = [...state.cart, { ...action.payload, count: 1 }];
            return { ...state, cart: newCart };
        default: {
            return state;
        }
    }
};

export const Context = createContext<State>({
    ...initialState,
});
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {}, [dispatch]);

    return (
        <Context.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <div>{children}</div>
            </DispatchContext.Provider>
        </Context.Provider>
    );
};
