import {createAsyncThunk} from "@reduxjs/toolkit";
import {OmUser} from "../../../../../entities/OmUser";
import axios from "axios";
import {OM_USER_LOCAL_STORAGE_KEY} from "../../../../../shared/const/localStorage";
import {omUserActions} from "../../../../../entities/OmUser/model/slice/OmUserSlice";
import i18n from "i18next";

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<OmUser, LoginByEmailProps, {rejectValue: string}>(
    "login/loginByEmail",
     async (authData, thunkAPI) => {
         try {
             console.log("authData", authData);
             const response = await axios.post<OmUser>(
                 "http://localhost:8081/api/v1/auth/authenticate", authData)
             if (!response.data) {
                 throw new Error();
             }

             localStorage.setItem(OM_USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data));
             thunkAPI.dispatch(omUserActions.setAuthData(response.data));

             return response.data;
         } catch (e) {
             console.log(e);
             return thunkAPI.rejectWithValue(i18n.t("Вы ввели не верный логин или пароль"));
         }
     },
);