import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {
    PageRequest,
    type PageUiOrder,
    type UiOrder
} from "../../../clients/generated/commonApi/models";
import {orderService} from "../../../services";
import {useEffect, useMemo, useState} from "react";
import {Pagination} from "../../../shared/ui/Pagination";
import {OrderState} from "../../type";
import cls from "./Counterparty.module.scss";
import {RoutePath} from "../../../shared/config/routeConfig/routeConfig.tsx";
import {Link} from "react-router-dom";
import {manyFormat} from "../../../shared/lib/manyFormat.ts";


interface CounterpartyContractsProps {
    counterpartyId: string;
}

export const orderStateColors = {
    NEW: cls.blue,
    IN_WORK: cls.blue,
    READY: cls.blue,
    SHIPPED: cls.blue,
    COMPLETED: cls.green,
    CANCELLED: cls.red
};


export const CounterpartyContracts = (props: CounterpartyContractsProps) => {
    const {counterpartyId} = props;

    const [orders, setOrders] = useState<UiOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0); // Текущая страница
    const [totalPages, setTotalPages] = useState<number>(0); // Общее количество страниц
    const pageRequest: PageRequest = useMemo(() => ({
        page: currentPage,
        size: 20,
    }), [currentPage]);

    useEffect(() => {
        fetchCounterpartyOrders();
    }, [counterpartyId, pageRequest]);

    const fetchCounterpartyOrders = async () => {
        setLoading(true); // Устанавливаем состояние загрузки
        try {
            const data: PageUiOrder = await orderService.getAllOrdersByCounterparty(counterpartyId, pageRequest);
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
        <div>
            <div className="container mb-2">
                <div className="d-flex">
                    {orders.map((order) => (
                        <Box className={`${cls.card} ms-4`}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography
                                        className="fs-5"
                                        gutterBottom
                                        sx={{ color: 'text.secondary', fontSize: 14 }}
                                    >
                                        {order.orderNumber}
                                        <span className={`${cls.state} ${orderStateColors[order.orderState]} ms-2`}>{OrderState[order.orderState]}</span>
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                        {order.orderName || "Без наименования"}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                                        Сумма: {manyFormat(order.currentSum)} руб.
                                        <br/>
                                        Задолженность: {manyFormat(order.debtSum)} руб.
                                        <br/>
                                        Дата создания: {order.createdDate}
                                        <br/>
                                        Дата завершения: {order.completionDate}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                        Договор: {order.contract?.contractNumber || "Без договора"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                          style={{textDecoration: 'none', color: 'inherit'}}>
                                        <Button size="small">Перейти к заказу</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Box>
                    ))}
                </div>
            </div>
            <Pagination
                className="mt-4"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>


    );
};
