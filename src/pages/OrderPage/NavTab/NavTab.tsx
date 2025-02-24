import {classNames} from "../../../shared/lib/classNames";
import {ActiveTab} from "../ui/OrderPage";
import {useTranslation} from "react-i18next";

interface NavTabProps {
    className?: string;
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
}

export const NavTab = (props: NavTabProps) => {
    const {t} = useTranslation("order");
    const {
        className,
        activeTab,
        setActiveTab,
    } = props

    return (
        <div className={classNames("mb-5", {}, [className])}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a
                        className={classNames("nav-link fs-6 font-monospace", {active: activeTab === 'info'})}
                        onClick={() => setActiveTab('info')}
                        href="#">{t("О заказе")}</a>
                </li>
                <li className="nav-item">
                    <a
                        className={classNames("nav-link fs-6 font-monospace", {active: activeTab === 'payments'})}
                        onClick={() => setActiveTab('payments')}
                        href="#">{t("Платежи")}
                    </a>
                </li>
                <li className="nav-item">
                    <a className={classNames("nav-link fs-6 font-monospace", {active: activeTab === 'tasks'})}
                       onClick={() => setActiveTab('tasks')}
                       href="#">{t("Задачи")}</a>
                </li>
                {activeTab === 'itemPage' && (
                    <li className="nav-item">
                        <a className={classNames("nav-link fs-6 font-monospace", {active: activeTab === 'itemPage'})}
                           onClick={() => setActiveTab('itemPage')}
                           href="#">{t("Позиция")}</a>
                    </li>
                )}
            </ul>
        </div>
    );
};
