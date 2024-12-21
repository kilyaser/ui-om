import {classNames} from "../../../shared/lib/classNames";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {orderService} from "../../../services";
import {UiOrder} from "../../../clients/generated/commonApi/models";

import cls from "./OrderPage.module.scss";
import {useTranslation} from "react-i18next";
import {OrderInfo} from "./OrderInfo.tsx";
import {manyFormat} from "../../../shared/lib/manyFormat.ts";
import {ItemInfo} from "./ItemInfo.tsx";

interface OrderPageProps {
    className?: string;
}


export const OrderPage = ({className}: OrderPageProps) => {
    const {t} = useTranslation("order");
    const {orderId = ""} = useParams(); // Получаем orderId из параметров URL
    const [order, setOrder] = useState<UiOrder | null>(null); // Состояние для хранения информации о заказе
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data: UiOrder = await orderService.getOrderById(orderId); // Получаем данные о заказе
                setOrder(data); // Устанавливаем данные о заказе в состояние
            } catch (err) {
                setError('Ошибка при загрузке информации о заказе'); // Устанавливаем сообщение об ошибке
                console.error(err);
            } finally {
                setLoading(false); // Завершаем состояние загрузки
            }
        };

        fetchOrder(); // Вызываем функцию для получения данных о заказе
    }, [orderId]);

    if (loading) return <div>Загрузка...</div>; // Отображаем сообщение о загрузке
    if (error) return <div>{error}</div>; // Отображаем сообщение об ошибке

    return (
        <div className={classNames(cls.OrderPage, {}, [className])}>
            {order ? (
                <div>
                    <OrderInfo
                        className={cls.OrderPage}
                        order={order}
                    />
                    <ItemInfo
                        className={cls.OrderPage}
                        orderItems={order.orderItems || []}
                    />

                    {/* Блок платежей */}
                    {order.payments && order.payments.length > 0 && (
                        <div className="order-payments">
                            <h2>Платежи</h2>
                            <ul>
                                {order.payments.map(payment => (
                                    <li key={payment.paymentId}>
                                        <p>
                                            <strong>Сумма:</strong> {new Intl.NumberFormat('ru-RU').format(payment.paymentSum ?? 0)}
                                        </p>
                                        <p><strong>Дата платежа:</strong> {payment.paymentDate}</p>
                                        {/* Добавьте другие поля по мере необходимости */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Блок задач */}
                    {order.tasks && order.tasks.length > 0 && (
                        <div className="order-tasks">
                            <h2>Задачи</h2>
                            <ul>
                                {order.tasks.map(task => (
                                    <li key={task.id}>
                                        <p><strong>Описание задачи:</strong> {task.description}</p>
                                        <p><strong>Статус:</strong> {task.completed}</p>
                                        {/* Добавьте другие поля по мере необходимости */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div>Заказ не найден.</div>
            )}
        </div>
    );
};

export default OrderPage;
