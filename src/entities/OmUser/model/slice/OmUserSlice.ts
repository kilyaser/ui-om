import {OmUser, OmUserSchema} from "../types/OmUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OM_USER_LOCAL_STORAGE_KEY} from "../../../../shared/const/localStorage";

const initialState: OmUserSchema = {

};

export const omUserSlice = createSlice({
   name: "OmUser",
   initialState,
   reducers: {
       setAuthData: (state, action: PayloadAction<OmUser>) => {
           state.authData = action.payload;
       },
       initAuthData: (state) => {
           const omUser = localStorage.getItem(OM_USER_LOCAL_STORAGE_KEY);
           if (omUser) {
               state.authData = JSON.parse(omUser);
           }
       },
       logout: (state) => {
           state.authData = undefined;
           localStorage.removeItem(OM_USER_LOCAL_STORAGE_KEY);
       },
   }, 
});

export const {actions: omUserActions} = omUserSlice

export const {reducer: omUserReducer} = omUserSlice;