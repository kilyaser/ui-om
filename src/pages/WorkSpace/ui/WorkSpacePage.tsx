import {useTranslation} from "react-i18next";
import {orderService} from "../../../services";
import {PageRequest, PageUiOrderShort, UiOrderShort} from "../../../clients/generated/commonApi/models";
import {Table} from "../../../shared/ui/Table";
import {useEffect, useMemo, useState} from "react";

const WorkSpacePage  = () => {
    const {t} = useTranslation();
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
        t("Дата завершеня.")
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
            columns={columns}
            ordersShort={orders}
        />
    );
};
export default WorkSpacePage;