import {useTranslation} from "react-i18next";
import {orderService} from "../../../services";
import {PageRequest, PageUiOrderShort, UiOrderShort} from "../../../clients/generated/commonApi/models";
import {Table} from "../../../shared/ui/Table";
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {RoutePath} from "../../../shared/config/routeConfig/routeConfig";
import {Pagination} from "../../../shared/ui/Pagination";
import {OrderState} from "../../type";
import cls from "./WorkSpagePage.module.scss";
import {WorkSpaceHeader} from "./WorkSpaceHeader.tsx";
import {manyFormat} from "../../../shared/lib/manyFormat.ts";

const orderStateColors = {
    NEW: cls.blue,
    IN_WORK: cls.blue,
    READY: cls.blue,
    SHIPPED: cls.blue,
    COMPLETED: cls.green,
    CANCELLED: cls.red,
};

const WorkSpacePage = () => {
    const {t} = useTranslation("order");
    const [orders, setOrders] = useState<UiOrderShort[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0); // Текущая страница
    const [totalPages, setTotalPages] = useState<number>(0); // Общее количество страниц
    const pageRequest: PageRequest = useMemo(() => ({
        page: currentPage,
        size: 20,
    }), [currentPage]);

    const columns = [
        "#",
        t("Номер заказа"),
        t("Наименование заказа"),
        t("Наименование контрагента"),
        t("Сумма"),
        t("Статус"),
        t("ГОЗ"),
        t("Дата создания"),
        t("Дата завершения")
    ]

    useEffect(() => {
        refreshOrders();
    }, [pageRequest]);

    const refreshOrders = async () => {
        setLoading(true); // Устанавливаем состояние загрузки
        try {
            const data: PageUiOrderShort = await orderService.getOrdersPage(pageRequest);
            setOrders(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            setError('Ошибка при загрузке заказов:');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={"container-fluid"}>
            <WorkSpaceHeader
                onOrderCreated={refreshOrders}
            />
            <Table
                className={"table rounded-3"}
                columns={columns}
                data={orders}
                renderRow={(order, index) => (
                    <>
                        <th scope="row">{index + 1 + currentPage * 20}</th>
                        <td>
                            <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {order.orderNumber}
                            </Link>
                        </td>
                        <td>
                            <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {order.orderName}
                            </Link>
                        </td>
                        <td>
                            <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {order.counterpartyName}
                            </Link>
                        </td>

                        <td>
                            <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {manyFormat(order.currentSum)}
                            </Link>
                        </td>
                        <td>
                            <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                            <span className={`${cls.WorkSpace} ${orderStateColors[order.orderState || "NEW"]}`}>
                                {order.orderState && OrderState[order.orderState]
                                    ? OrderState[order.orderState] : ''}
                            </span>
                                </Link>

                        </td>
                        <td>
                            <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {order.isGovernmentOrder ? 'Да' : 'Нет'}
                            </Link>
                        </td>
                        <td>
                            <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {order.createdDate}
                            </Link>
                        </td>
                        <td>
                            <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {order.completionDate}
                            </Link>
                        </td>
                    </>
                )}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};
export default WorkSpacePage;