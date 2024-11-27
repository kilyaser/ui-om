import {RoutePath} from "../../../../../shared/config/routeConfig/routeConfig.tsx";
import DashBoardIcon from "../../../../../shared/icons/dashboard.svg?react";
import WorkSpaceIcon from "../../../../../shared/icons/ordersIcon.svg?react";

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
    }
];