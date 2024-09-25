import {LoginSchema} from "../types/loginSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginByEmail} from "../services/loginByEmail/loginByEmail";

const initialState: LoginSchema = {
    isLoading: false,
    password: "",
    email: ""
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
});

export const {actions: loginActions} = loginSlice;

export const {reducer: loginReducer} = loginSlice;