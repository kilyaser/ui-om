import {StoreProvider} from "./ui/StoreProvider";
import {AppDispatch, createReduxStore} from "./config/store";
import {StateSchema} from "./config/StateSchema";

export {
    StoreProvider,
    createReduxStore
};
export type {
    StateSchema,
    AppDispatch
};
