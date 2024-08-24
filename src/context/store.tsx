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
    final: 0,
    discounts_applied: [],
};
export interface State {
    prices: Structure[];
    cart: Cart[];
    total: number;
    final: number;
    discounts_applied: any;
}

export interface Action {
    type: string;
    payload?: any;
}
export const actionTypes = {
    UPDATE_PRICES: "UPDATE_PRICES",
    UPDATE_CART: "UPDATE_CART",
    RUNNING_TOTAL: "RUNNING_TOTAL",
    FINAL_TOTAL: "FINAL_TOTAL",
    REPLACE_CART: "REPLACE_CART",
    RELOAD_CART: "RELOAD_CART",
    REMOVE_ITEM: "REMOVE_ITEM",
    DISCOUNT_APPLIED: "DISCOUNT_APPLIED",
};
const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PRICES:
            return { ...state, prices: action.payload };
        case actionTypes.FINAL_TOTAL:
            const final = calculateTotal(action.payload);
            const discounts = state.cart.filter(
                (item) => item.specialPrice !== null
            );
            return { ...state, final, discounts_applied: discounts };
        case actionTypes.RUNNING_TOTAL:
            const total = calculateTotal(state.cart);
            const discounts2 = state.cart.filter(
                (item) => item.specialPrice !== null
            );
            return { ...state, total, discounts_applied: discounts2 };
        case actionTypes.RELOAD_CART:
            const json = action.payload;
            return {
                ...state,
                cart: json ? JSON.parse(json) : [],
            };
        case actionTypes.REPLACE_CART:
            localStorage.setItem("cart", JSON.stringify(action.payload));
            return { ...state, cart: action.payload };
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
            localStorage.setItem("cart", JSON.stringify(newCart));
            return { ...state, cart: newCart };
        case actionTypes.REMOVE_ITEM:
            const updatedCart = state.cart.filter(
                (item) => String(item.id) !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { ...state, cart: updatedCart };

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

    useEffect(() => {
        const cartStorage = localStorage.getItem("cart");
        dispatch({ payload: cartStorage, type: actionTypes.RELOAD_CART });
    }, [dispatch]);

    return (
        <Context.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <div>{children}</div>
            </DispatchContext.Provider>
        </Context.Provider>
    );
};
