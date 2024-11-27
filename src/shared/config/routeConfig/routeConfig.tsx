import {RouteProps} from "react-router-dom";
import {WorkSpacePage} from "../../../pages/WorkSpace";
import {DashBoardPage} from "../../../pages/DashBoard";
import {NotFoundPage} from "../../../pages/NotFoundPage";


export enum AppRoutes {
    WORKSPACE = 'workspace',
    DASHBOARD = 'dashboard',
    // TASKS = 'tasks',
    //последний
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.WORKSPACE]: '/',
    [AppRoutes.DASHBOARD]: '/dashboard',
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
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage/>
    }
}