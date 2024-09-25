
import cls from "./Navbar.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {Button} from "../../../shared/ui/Button/Button";
import {ButtonOutlineStyle} from "../../../shared/ui/Button/ButtonStyleType";
import {useCallback, useState} from "react";
import {LoginModal} from "../../../features/AuthByEmail/ui/LoginModal/LoginModal";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className = ""}: NavbarProps) => {
    const {t} = useTranslation();

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, [])

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <Button
                className={classNames(ButtonOutlineStyle.SECONDARY, {}, [cls.links])}
                onClick={onShowModal}

            >
                {t("Войти")}
            </Button>
            <LoginModal
                isOpen={isAuthModal}
                onClose={onCloseModal}/>
        </nav>
    );
};
