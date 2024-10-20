import cls from "./LoginForm.module.scss"
import {useTranslation} from "react-i18next";
import {classNames} from "../../../../shared/lib/classNames";
import {memo, useCallback} from "react";
import {Input} from "../../../../shared/ui/Input/Input";
import {Button} from "../../../../shared/ui/Button/Button";
import {ButtonOutlineStyle} from "../../../../shared/ui/Button/ButtonStyleType";
import {getLoginState} from "../../model/selectors/getLoginState/getLoginState";
import {loginByEmail} from "../../model/services/loginByEmail/loginByEmail";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDipatch/useAppDispatch.ts";
import {useSelector} from "react-redux";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({className = ""}: LoginFormProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {
        email,
        password,
        error,
        isLoading
    } = useSelector(getLoginState);

    const onLoginClick = useCallback(() => {
        dispatch(loginByEmail({email, password}));
    }, [dispatch, email, password])

    return (
        <div
            className={classNames(cls.LoginForm, {}, [className])}
        >
            <p className="fw-bold fs-4">{t("Форма авторизации")}</p>
            {error && <p className="text-danger">{error}</p>}
            <Input
                type="email"
                placeholder={t("Введите email")}
            />
            <Input
                type="password"
                placeholder={t("Введите пароль")}
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
