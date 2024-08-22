import React, {
    createContext,
    useReducer,
    useEffect,
    Reducer,
    Dispatch,
    ReactNode,
} from "react";

const initialState = {};
interface State {}

interface Action {
    type: string;
    payload?: any;
}
export const actionTypes = {};
const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};

export const ContextContext = createContext<State>({
    state: { ...initialState },
});
export const ContextDispatchContext = createContext<Dispatch<Action> | null>(
    null
);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {}, [dispatch]);

    return (
        <ContextContext.Provider value={state}>
            <ContextDispatchContext.Provider value={dispatch}>
                <div>{children}</div>
            </ContextDispatchContext.Provider>
        </ContextContext.Provider>
    );
};
