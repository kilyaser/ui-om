import {authApi} from  "../../clients/generated/authClient";
import {AuthRequest, AuthResponse} from "../../clients/generated/authClient/models";
import {ACCESS_TOKEN, OM_USER_ID, OM_USER_LOCAL_STORAGE_KEY, REFRESH_TOKEN} from "../../shared/const/localStorage.ts";


class AuthService {

    async authenticate(req: AuthRequest): Promise<AuthResponse> {
        try {
            const response: AuthResponse = await authApi.authenticate(req);

            localStorage.setItem(OM_USER_LOCAL_STORAGE_KEY, JSON.stringify(response));
            localStorage.setItem(OM_USER_ID, response.userId || "");
            localStorage.setItem(REFRESH_TOKEN, response.refreshToken || "");
            localStorage.setItem(ACCESS_TOKEN, response.accessToken || "");
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;

