import {StateSchema} from "./StateSchema";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {omUserReducer} from "../../../../entities/OmUser/model/slice/OmUserSlice";
import {loginReducer} from "../../../../features/AuthByEmail/model/slice/loginSlice";

export function createReduxStore(initialState?: StateSchema) {

    const rootReducers: ReducersMapObject<StateSchema> = {
        omUser: omUserReducer,
        loginForm: loginReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: import.meta.env.DEV,
        preloadedState: initialState,
    });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];