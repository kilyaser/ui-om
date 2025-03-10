import {RoutePath} from "../../../../../shared/config/routeConfig/routeConfig";
import DashBoardIcon from "../../../../../shared/icons/dashboard.svg?react";
import WorkSpaceIcon from "../../../../../shared/icons/ordersIcon.svg?react";
import CounterpartyIcon from "../../../../../shared/icons/counterparties.svg?react";
import MachinesIcon from "../../../../../shared/icons/factory.svg?react";

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.dashboard,
        Icon: DashBoardIcon,
        text: 'Дашборд',
    },
    {
        path: RoutePath.workspace,
        Icon: WorkSpaceIcon,
        text: 'Заказы',
    },
    {
        path: RoutePath.counterparties,
        Icon: CounterpartyIcon,
        text: 'Контрагенты'
    },
    {
        path: RoutePath.machines,
        Icon: MachinesIcon,
        text: 'Оборудование'
    }
];