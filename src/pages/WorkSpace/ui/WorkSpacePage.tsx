import {useTranslation} from "react-i18next";
import {orderService} from "../../../services";
import {PageRequest, PageUiOrderShort, UiOrderShort} from "../../../clients/generated/commonApi/models";
import {Table} from "../../../shared/ui/Table";
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {RoutePath} from "../../../shared/config/routeConfig/routeConfig";
import {Pagination} from "../../../shared/ui/Pagination";
import {OrderState} from "../../type";

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
        t("Наименование контрагента"),
        t("Сумма"),
        t("Статус"),
        t("ГОЗ"),
        t("Дата завершеня")
    ]

    useEffect(() => {
        const fetchOrders = async () => {
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

        fetchOrders();
    }, [pageRequest]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Table
                className={"table"}
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
                        <td>{order.counterpartyName}</td>
                        <td>{new Intl.NumberFormat('ru-RU').format(order.currentSum ?? 0)}</td>
                        <td>{order.orderState && OrderState[order.orderState]
                            ? OrderState[order.orderState] : ''}
                        </td>
                        <td>{order.isGovernmentOrder ? 'Да' : 'Нет'}</td>
                        <td>{order.completionDate}</td>
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