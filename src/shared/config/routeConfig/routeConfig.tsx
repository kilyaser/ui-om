import {RouteProps} from "react-router-dom";
import {WorkSpacePage} from "../../../pages/WorkSpace";
import {DashBoardPage} from "../../../pages/DashBoard";
import {NotFoundPage} from "../../../pages/NotFoundPage";
import {OrderPage} from "../../../pages/OrderPage";
import {CounterpartiesPage} from "../../../pages/CounterpartiesPage";
import {CounterpartyPage} from "../../../pages/CounterpartyPage";
import {MachinesPage} from "../../../pages/MachinesPage";


export enum AppRoutes {
    WORKSPACE = 'workspace',
    DASHBOARD = 'dashboard',
    ORDER = 'order',
    COUNTERPARTIES = 'counterparties',
    COUNTERPARTY = 'counterparty',
    MACHINES = 'machines',
    // TASKS = 'tasks',
    //последний
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.WORKSPACE]: '/',
    [AppRoutes.DASHBOARD]: '/dashboard',
    [AppRoutes.ORDER]: '/order/:orderId',
    [AppRoutes.COUNTERPARTIES]: '/counterparties',
    [AppRoutes.COUNTERPARTY]: '/counterparty/:counterpartyId',
    [AppRoutes.MACHINES]: '/machines',

    // [AppRoutes.TASKS]: '/tasks',
    //последний
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.WORKSPACE]: {
        path: RoutePath.workspace,
        element: <WorkSpacePage/>
    },
    [AppRoutes.DASHBOARD]: {
        path: RoutePath.dashboard,
        element: <DashBoardPage/>
    },
    [AppRoutes.ORDER]: {
        path: RoutePath.order,
        element: <OrderPage/>
    },
    [AppRoutes.COUNTERPARTIES]: {
        path: RoutePath.counterparties,
        element: <CounterpartiesPage/>
    },
    [AppRoutes.COUNTERPARTY]: {
        path: RoutePath.counterparty,
        element: <CounterpartyPage/>
    },
    [AppRoutes.MACHINES]: {
        path: RoutePath.machines,
        element: <MachinesPage/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage/>
    }
}