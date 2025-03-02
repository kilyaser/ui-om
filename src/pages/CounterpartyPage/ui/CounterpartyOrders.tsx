import {Box, Button, Card, CardActions, CardContent, Tooltip, Typography} from "@mui/material";
import {
    PageRequest,
    type PageUiOrder, UiCounterparty,
    type UiOrder
} from "../../../clients/generated/commonApi/models";
import {orderService} from "../../../services";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Pagination} from "../../../shared/ui/Pagination";
import {OrderState} from "../../type";
import cls from "./Counterparty.module.scss";
import {RoutePath} from "../../../shared/config/routeConfig/routeConfig";
import {Link} from "react-router-dom";
import {manyFormat} from "../../../shared/lib/manyFormat";
import {OrderModal} from "../../../shared/ui/OrderModal";


interface CounterpartyOrdersProps {
    counterparty: UiCounterparty;
}

export const orderStateColors = {
    NEW: cls.blue,
    IN_WORK: cls.blue,
    READY: cls.blue,
    SHIPPED: cls.blue,
    COMPLETED: cls.green,
    CANCELLED: cls.red
};


export const CounterpartyOrders = (props: CounterpartyOrdersProps) => {
    const {counterparty} = props;
    const counterpartyId = counterparty.id;
    const [orders, setOrders] = useState<UiOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0); // Текущая страница
    const [totalPages, setTotalPages] = useState<number>(0); // Общее количество страниц
    const pageRequest: PageRequest = useMemo(() => ({
        page: currentPage,
        size: 20,
    }), [currentPage]);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onShow = useCallback(() => {
        setIsOpen(true);
    }, [])

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
                <div className="position-relative">
                <div className="d-flex">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                                <Box key={order.orderId} className={`${cls.card} ms-4`}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Typography
                                                className="fs-5"
                                                gutterBottom
                                                sx={{ color: 'text.secondary', fontSize: 14 }}
                                            >
                                                {order.orderNumber}
                                                <span className={`${cls.state} ${orderStateColors[order.orderState]} ms-2 fs-6`}>{OrderState[order.orderState]}</span>
                                            </Typography>

                                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                                {order.orderName || "Без наименования"}
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                                Договор: {order.contract?.contractNumber || "Без договора"}
                                            </Typography>
                                            <div className="d-flex justify-content-between">
                                                <div>Сумма:</div>
                                                <div>{manyFormat(order.currentSum)} руб.</div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Задолженность:</div>
                                                <div>{manyFormat(order.debtSum)} руб.</div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Дата создания:</div>
                                                <div>{order.createdDate}</div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Дата завершения:</div>
                                                <div>{order.completionDate}</div>
                                            </div>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={RoutePath.order.replace(":orderId", `${order.orderId}`)}
                                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                                <Button size="small">Перейти к заказу</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Box>
                            ))
                    ) : (
                        <p className="text-muted">Заказы не найдены</p>
                    )}
                </div>
                <div className="position-absolute top-0 end-0">
                    <Tooltip title={"Создать заказ"}>
                        <button
                            className="btn btn-primary rounded-circle"
                            type="submit"
                            onClick={onShow}
                        >
                            <span className="h4">
                                +
                            </span>
                        </button>
                    </Tooltip>
                </div>

            </div>
            </div>
            <Pagination
                className="mt-4"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <OrderModal
                isOpen={isOpen}
                onClose={onClose}
                onOrderCreated={fetchCounterpartyOrders}
                counterparty={counterparty}
            />
        </div>
    );
};
