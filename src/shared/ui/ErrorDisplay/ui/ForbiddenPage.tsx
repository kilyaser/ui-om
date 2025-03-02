import {classNames} from "../../../lib/classNames";
import LockIcon from '@mui/icons-material/Lock';
import cls from "./ErrorDisplay.module.scss";

interface ForbiddenPageProps {
    className?: string;
}

export const ForbiddenPage = ({className}: ForbiddenPageProps) => {

    return (
        <div className={classNames(cls.forbidden, {}, [className])}>
            <div className={`d-flex justify-content-center ${cls.forbidden}`}>
                <div className="position-relative align-self-center">
                    <p className="fs-1 text-muted">Доступ запрещен</p>
                    <div className="position-absolute top-100 start-50 translate-middle">
                        <LockIcon color={"error"} fontSize="large" />
                    </div>
                </div>
            </div>

        </div>
    );
};
