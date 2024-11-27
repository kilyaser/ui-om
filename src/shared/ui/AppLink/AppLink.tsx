import {memo, ReactNode} from "react";
import {Link, LinkProps} from "react-router-dom";
import {classNames} from "../../lib/classNames";
import cls from "./AppLink.module.scss";

interface AppLinkProps extends LinkProps {
    className?: string;
    children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        children,
        className,
        ...otherProps
    } = props

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
