
import {classNames} from "../../../lib/classNames.ts";


interface AlertProps {
    className?: string;
    additional: Array<string | undefined>;
    message: string;
}

export const Alert = (props: AlertProps) => {
    const {
        className = "alert",
        additional = [],
        message,
    } = props;

    return (
        <div className={classNames(className, {}, additional)} role="alert">
            {message}
        </div>
    );
};
