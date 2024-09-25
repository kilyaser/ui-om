
import {classNames} from "../../../lib/classNames";
import {useTranslation} from "react-i18next";
import {Button} from "../../Button/Button";
import cls from "./LangSwitcher.module.scss";
import {ButtonOutlineStyle} from "../../Button/ButtonStyleType";

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({className = ""}: LangSwitcherProps) => {
    const {t, i18n} = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
    }
    return (

        <Button
            className={classNames(cls.langSwitcher, {}, [className, ButtonOutlineStyle.PRIMARY])}
            onClick={toggle}
        >
            {t('Язык')}
        </Button>

    );
};
