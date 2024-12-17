import {createAsyncThunk} from "@reduxjs/toolkit";
import {OmUser} from "../../../../../entities/OmUser";
import {ACCESS_TOKEN, OM_USER_LOCAL_STORAGE_KEY, REFRESH_TOKEN} from "../../../../../shared/const/localStorage";
import {omUserActions} from "../../../../../entities/OmUser/model/slice/OmUserSlice";
import i18n from "i18next";
import {AuthRequest, AuthResponse} from "../../../../../clients/generated/authClient/models";
import {authApi} from "../../../../../clients/generated/authClient";

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<AuthResponse, LoginByEmailProps, {rejectValue: string}>(
    "login/loginByEmail",
     async (authData, thunkAPI) => {
         try {
             console.log("authData", authData);
             const authRequest: AuthRequest = { email: authData.email, password: authData.password };
             const response = transformAuthResponseToOmUser(await authApi.authenticate(authRequest));

             localStorage.setItem(OM_USER_LOCAL_STORAGE_KEY, JSON.stringify(response));
             localStorage.setItem(REFRESH_TOKEN, response.refreshToken)
             localStorage.setItem(ACCESS_TOKEN, response.refreshToken)
             thunkAPI.dispatch(omUserActions.setAuthData(response));

             return response;
         } catch (e) {
             console.log(e);
             return thunkAPI.rejectWithValue(i18n.t("Вы ввели не верный логин или пароль"));
         }
     },
);

export const transformAuthResponseToOmUser  = (authResponse: AuthResponse): OmUser  => {
    if (!authResponse.userId || !authResponse.accessToken || !authResponse.refreshToken) {
        throw new Error("Недостаточно данных для создания OmUser ");
    }

    return {
        userId: authResponse.userId,
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
    };
};