import {useTranslation} from "react-i18next";
import {orderService} from "../../../services";
import {PageRequest, PageUiOrderShort, UiOrderShort} from "../../../clients/generated/commonApi/models";
import {Table} from "../../../shared/ui/Table";
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {RoutePath} from "../../../shared/config/routeConfig/routeConfig.tsx";

const WorkSpacePage = () => {
    const {t} = useTranslation("order");
    const [orders, setOrders] = useState<UiOrderShort[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const pageRequest: PageRequest = useMemo(() => ({
        page: 0,
        size: 20,
    }), []);

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
                const data: PageUiOrderShort = await orderService.getOrderPage(pageRequest);
                setOrders(data.content || []); // Устанавливаем содержимое заказов
            } catch (error) {
                setError('Ошибка при загрузке заказов');
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
        <Table
            className={"table table-striped"}
            columns={columns}
            data={orders}
            renderRow={(order, index) => (
                <>
                    {/*<Link to={RoutePath.order.replace(":orderId", `/${order.orderId}`)}></Link>*/}
                    <th scope="row">{index + 1}</th>
                    <td>{order.orderNumber}</td>
                    <td>{order.counterpartyName}</td>
                    <td>{new Intl.NumberFormat('ru-RU').format(order.currentSum ?? 0)}</td>
                    <td>{order.orderState}</td>
                    <td>{order.isGovernmentOrder ? 'Да' : 'Нет'}</td>
                    <td>{order.completionDate}</td>
                </>

            )}
        />
    );
};
export default WorkSpacePage;