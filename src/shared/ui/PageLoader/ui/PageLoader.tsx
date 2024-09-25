
import cls from "./PageLoader.module.scss";
import {classNames} from "../../../lib/classNames";
import {Loader} from "../../Loader";


interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({className = ""}: PageLoaderProps) => {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader/>
        </div>
    );
};
