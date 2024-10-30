
import cls from "./Navbar.module.scss";
import {classNames} from "../../../shared/lib/classNames";
import {Button, ButtonTheme} from "../../../shared/ui/Button/Button";
import {useCallback, useState} from "react";
import {LoginModal} from "../../../features/AuthByEmail/ui/LoginModal/LoginModal";

import LoginIcon from '../../../shared/icons/login.svg?react';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className = ""}: NavbarProps) => {

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
                className={classNames(ButtonTheme.CLEAR, {}, [cls.links])}
                onClick={onShowModal}

            >
                <LoginIcon/>
            </Button>
            <LoginModal
                isOpen={isAuthModal}
                onClose={onCloseModal}/>
        </nav>
    );
};
