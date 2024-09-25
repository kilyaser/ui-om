
import cls from "./Loader.module.scss";
import {classNames} from "../../../lib/classNames";

interface LoaderProps {
    className?: string;
}

export const Loader = ({className = ""}: LoaderProps) => {
    return (
        <span className={classNames(cls.loader, {}, [className])}>
        </span>
    );
};
