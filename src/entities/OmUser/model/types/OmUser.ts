export interface OmUser {
    userId: string;
    accessToken: string;
    refreshToken: string;
}

export interface OmUserSchema {
    authData?: OmUser;
}