import {LoginSchema} from "../../../../features/AuthByEmail/model/types/loginSchema";
import {OmUserSchema} from "../../../../entities/OmUser";


export interface StateSchema {
    omUser: OmUserSchema;
    loginForm: LoginSchema;
}