import React, {
    createContext,
    useReducer,
    useEffect,
    Reducer,
    Dispatch,
    ReactNode,
} from "react";
import { Cart, Structure } from "../components/types/main";

const initialState = {
    prices: [],
    cart: [],
};
interface State {
    prices: Structure[];
    cart: Cart[];
}

interface Action {
    type: string;
    payload?: any;
}
export const actionTypes = {
    UPDATE_PRICES: "UPDATE_PRICES",
    UPDATE_CART: "UPDATE_CART",
};
const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PRICES:
            return { ...state, prices: action.payload };
        case actionTypes.UPDATE_CART:
            const newCart = [...state.cart, action.payload];
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
