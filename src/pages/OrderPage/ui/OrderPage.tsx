import {classNames} from "../../../shared/lib/classNames";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {orderService} from "../../../services";
import {UiOrder, UiPaymentShort} from "../../../clients/generated/commonApi/models";

import cls from "./OrderPage.module.scss";
import {OrderInfo} from "./OrderInfo";
import {ItemInfo} from "./ItemInfo";
import {PaymentsInfo} from "./PaymentsInfo";
import {TaskInfo} from "./TaskInfo";
import {ItemInfoFooter} from "./ItemInfoFooter";
import {NavTab} from "./NavTab.tsx";

interface OrderPageProps {
    className?: string;
}

export type ActiveTab = 'info' | 'payments' | 'tasks'


export const OrderPage = ({className}: OrderPageProps) => {
    const {orderId = ""} = useParams(); // Получаем orderId из параметров URL
    const [order, setOrder] = useState<UiOrder | null>(null); // Состояние для хранения информации о заказе
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ActiveTab>('info');
    const [payments, setPayments] = useState<UiPaymentShort[]>(order?.payments || []);

    const fetchOrderData = async () => {
        try {
            const data: UiOrder = await orderService.getOrderById(orderId);
            setOrder(data); // Устанавливаем данные о заказе в состояние
            setPayments(data.payments || []); // Устанавливаем платежи
        } catch (err) {
            setError('Ошибка при загрузке информации о заказе'); // Устанавливаем сообщение об ошибке
            console.error(err);
        } finally {
            setLoading(false); // Завершаем состояние загрузки
        }
    };

    useEffect(() => {
       fetchOrderData() // Вызываем функцию для получения данных о заказе
    }, [orderId]);

    const handleChangePayment = async () => {
        await fetchOrderData()
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={classNames(cls.OrderPage, {}, [className])}>
            <NavTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {order ? (
                <div className="container-fluid mt-3">
                    {activeTab === 'info' && (
                        <>
                            <OrderInfo
                                className={cls.OrderPage}
                                order={order}
                            />
                            <ItemInfo
                                className={cls.OrderPage}
                                orderItems={order.orderItems || []}
                            />
                            <ItemInfoFooter order={order}/>
                        </>
                    )}
                    {activeTab === 'payments' && (
                        <PaymentsInfo
                            orderId={orderId}
                            counterpartyId={order.counterparty?.id}
                            payments={payments}
                            onPaymentChanged={handleChangePayment}
                        />
                    )}
                    {activeTab === 'tasks' && (
                        <TaskInfo
                            tasks={order.tasks || []}
                        />
                    )}
                </div>
            ) : (
                <div>Заказ не найден.</div>
            )}
        </div>
    );
};

export default OrderPage;
