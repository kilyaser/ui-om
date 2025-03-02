import { classNames } from "../../../lib/classNames";
import {ForbiddenPage} from "./ForbiddenPage";

interface ErrorDisplayProps {
    error: Error
}

export const ErrorDisplay = ({error}: ErrorDisplayProps) => {

    if (error.message === '403') {
        return <ForbiddenPage/>
    }
    return (
        <div className={classNames("", {}, [])}>
            <div>Ошибка при получении данных, код: {error.message}</div>
        </div>
    );
};
