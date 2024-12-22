
import {classNames} from "../../../shared/lib/classNames.ts";
import {ActiveTab} from "./OrderPage.tsx";
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
        <div className={classNames("", {}, [className])}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a
                        className={classNames("nav-link", {active: activeTab === 'info'})}
                        onClick={() => setActiveTab('info')}
                        href="#">{t("О заказе")}</a>
                </li>
                <li className="nav-item">
                    <a
                        className={classNames("nav-link", {active: activeTab === 'payments'})}
                        onClick={() => setActiveTab('payments')}
                        href="#">{t("Платежи")}
                    </a>
                </li>
                <li className="nav-item">
                    <a className={classNames("nav-link", {active: activeTab === 'tasks'})}
                       onClick={() => setActiveTab('tasks')}
                       href="#">{t("Задачи")}</a>
                </li>
            </ul>
        </div>
    );
};
