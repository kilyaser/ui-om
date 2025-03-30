import {ACCESS_TOKEN, REFRESH_TOKEN} from "../const/localStorage.ts";

const baseURL = "/api"; // use your own URL here or environment variable
const noAuthEndpoint = ["/api/v1/auth/authenticate"];

const getTokens = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN); // или другой способ хранения токена
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    return { accessToken, refreshToken };
};

const refreshAccessToken = async () => {
    const { refreshToken } = getTokens();

    const response = await fetch(`${baseURL}/api/v1/auth/refresh-token`, {
        method: 'GET', // Измените метод на GET
        headers: {
            'Authorization': `Bearer ${refreshToken}`, // Передача refreshToken в заголовке
        },
    });

    if (!response.ok) {
        throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    localStorage.setItem(ACCESS_TOKEN, data.accessToken); // Сохраните новый accessToken
    localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
};

export const apiInstance = async <T>({
                                         url,
                                         method,
                                         params,
                                         data,
                                         headers,
                                         signal,
                                     }: {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    params?: string[][] | Record<string, string> | string | URLSearchParams;
    data?: BodyType<unknown>;
    signal?: AbortSignal;
    headers?: HeadersInit;
    responseType?: string;
}): Promise<T> => {
    const { accessToken } = getTokens();
    const finalHeaders: HeadersInit = {
        ...headers,
        'Content-Type': 'application/json',
    };

    if (!noAuthEndpoint.includes(url)) {
        (finalHeaders as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
    }

    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    const fullUrl = `${baseURL}${url}${queryString}`;
    const response = await fetch(
        fullUrl,
        {
            method,
            headers: finalHeaders,
            signal,
            ...(data ? {body: JSON.stringify(data)} : {}),
        }
    );
    if (response.status === 401) { // Если токен истек
        await refreshAccessToken(); // Попробуем обновить токен
        return apiInstance<T>({ url, method, params, data, headers, signal }); // Повторите запрос
    }

    if (!response.ok) {
        throw new Error(`${response.status}`);
    }

    return response.status === 204 ? null : response.json();
};

export default apiInstance;

export type BodyType<BodyData> = BodyData;