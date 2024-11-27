import {classNames} from "../../lib/classNames";
import cls from "./Button.module.scss";
import {ButtonHTMLAttributes, FC} from "react";

export enum ButtonTheme {
    CLEAR = "clear",
    OUTLINE = "outline",
}

export enum ButtonSize {
    M = "size_m",
    L = "size_l",
    XL = "size_xl",
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {

    const {
        className,
        children,
        theme = ButtonTheme.CLEAR,
        square = true,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [cls.square]: square
    };

   const additionalClass = [
       className,
       cls[theme]
   ]

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, additionalClass)}
            {...otherProps}
        >
            {children}
        </button>
    );
};
