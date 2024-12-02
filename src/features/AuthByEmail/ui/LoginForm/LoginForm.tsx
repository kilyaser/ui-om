import cls from "./LoginForm.module.scss"
import {useTranslation} from "react-i18next";
import {classNames} from "../../../../shared/lib/classNames";
import React, {memo, useCallback} from "react";
import {Input} from "../../../../shared/ui/Input/Input";
import {Button} from "../../../../shared/ui/Button/Button";
import {ButtonOutlineStyle} from "../../../../shared/ui/Button/ButtonStyleType";
import {getLoginState} from "../../model/selectors/getLoginState/getLoginState";
import {loginByEmail} from "../../model/services/loginByEmail/loginByEmail";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDipatch/useAppDispatch.ts";
import {useSelector} from "react-redux";
import {loginActions} from "../../model/slice/loginSlice.ts";

interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

export const LoginForm = memo(({className, onSuccess}: LoginFormProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {
        email,
        password,
        error,
        isLoading
    } = useSelector(getLoginState);

    const onChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setEmail(event.target.value));
    }, [dispatch]);

    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(event.target.value))
    },[dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByEmail({email, password}));
        if (result.meta.requestStatus === "fulfilled") {
            onSuccess();
        }
    }, [onSuccess, dispatch, email, password])

    return (
        <div
            className={classNames(cls.LoginForm, {}, [className])}
        >
            <p className="fw-bold fs-4">{t("Форма авторизации")}</p>
            {error && <p className="text-danger">{error}</p>}
            <Input
                type="email"
                placeholder={t("Введите email")}
                value={email}
                onChange={onChangeEmail}
            />
            <Input
                type="password"
                placeholder={t("Введите пароль")}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                className={classNames(cls.loginBtn, {}, [ButtonOutlineStyle.SECONDARY])}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t("Войти")}
            </Button>
        </div>
    );
});
