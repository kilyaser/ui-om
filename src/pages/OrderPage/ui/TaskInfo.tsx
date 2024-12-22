
import cls from "./TaskInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {UiTask} from "../../../clients/generated/commonApi/models";

interface TaskInfoProps {
    className?: string;
    tasks: UiTask[]
}

export const TaskInfo = (props: TaskInfoProps) => {
    const {t} = useTranslation("order");
    const {
        className,
        tasks
    } = props
    const completed = tasks.filter(task => task.isCompleted);
    const notComplecte = tasks.filter(task => !task.isCompleted);


    return (
        <div className={classNames(cls.TaskInfo, {}, [className])}>
            {tasks && tasks.length > 0 ? (
                <div className="order-tasks">
                    <p className="fs-4 fw-bolder border-bottom border-2">{t("Список Задач")}</p>

                    <p className="fs-5 fw-semibold mb-2">{t("Не выполнены")}</p>
                    {notComplecte.length > 0 ? (
                        notComplecte.map((task, index) => (
                            <div className="row border-bottom" key={task.id}>
                                <div className="col-1 text-center">{index + 1}</div>
                                <div className="col-8">{task.description}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">{t("Нет не выполненных задач")}.</p> // Сообщение, если нет не выполненных задач
                    )}

                    <p className="fs-5 fw-semibold mb-2 mt-2">{t("Выполнены")}</p>
                    {completed.length > 0 ? (
                        completed.map((task, index) => (
                            <div className="row border-bottom" key={task.id}>
                                <div className="col-1 text-center">{index + 1}</div>
                                <div className="col-8">{task.description}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">{t("Нет выполненных задач")}.</p> // Сообщение, если нет выполненных задач
                    )}
                </div>
            ) : (
                <p className="text-muted">{t("Нет доступных задач")}</p>
                )}
        </div>
    );
};
