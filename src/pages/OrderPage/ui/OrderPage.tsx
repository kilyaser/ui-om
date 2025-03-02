import {classNames} from "../../../shared/lib/classNames";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {orderService} from "../../../services";
import {UiOrder, UiOrderItem, UiPaymentShort} from "../../../clients/generated/commonApi/models";

import cls from "./OrderPage.module.scss";
import {OrderInfo} from "../OrderInfo/OrderInfo";
import {ItemInfo} from "../ItemInfo/ItemInfo.tsx";
import {PaymentsInfo} from "../PaymentsInfo/PaymentsInfo";
import {TaskInfo} from "../TaskInfo/TaskInfo";
import {NavTab} from "../NavTab/NavTab";
import {Alert} from "../../../shared/ui/Alert/ui/Alert";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import {OrderState} from "../../type";
import {useTranslation} from "react-i18next";
import {ActionOption} from "../ActionOption/ActionOption";
import {ItemPage} from "../../ItemPage";

interface OrderPageProps {
    className?: string;
}

export type ActiveTab = 'info' | 'payments' | 'tasks' | 'itemPage';

export const OrderPage = ({className}: OrderPageProps) => {
    const {orderId = ""} = useParams(); // Получаем orderId из параметров URL
    const [order, setOrder] = useState<UiOrder | null>(null); // Состояние для хранения информации о заказе
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ActiveTab>('info');
    const [payments, setPayments] = useState<UiPaymentShort[]>(order?.payments || []);
    const [selectedItem, setSelectedItem] = useState<UiOrderItem | null>(null); // Состояние для выбранного элемента
    const isAlertVisible = order && payments.length > 0;
    const totalPayments = payments.reduce((sum, payment) => sum + (payment.paymentSum || 0), 0) || 0;
    const totalOrderAmount = order?.currentSum || 0;
    const iaWarning = isAlertVisible && totalPayments > totalOrderAmount && totalPayments > 0;// Сумма платежей
    const stateKey = order?.orderState;
    const {t} = useTranslation("order");

    const fetchOrderData = useCallback(async () => {
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
    }, [orderId]);

    useEffect(() => {
        const loadOrder = async () => {
            await fetchOrderData()
        };
        loadOrder().catch(error => {
            console.error(error);
        })
    }, [fetchOrderData, orderId]);

    const handleChangeOrderInfo = async () => {
        await fetchOrderData()
    };

    const handleTabChange = (tab: ActiveTab, item?: UiOrderItem) => {
        setActiveTab(tab);
        setSelectedItem(item || null); // Устанавливаем выбранный элемент
    };

    const onActionSelected = (value: string) => {
        console.log(value);
    }


    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={classNames(cls.OrderPage, {}, [className, "container-fluid"])}>
            <div className="d-flex justify-content-between shadow-none rounded bg-light align-items-center">
                <div className="p-3 mb-3">
                    <p className="text-start mt-1 mb-1 fs-3">{order?.orderNumber} {t("от")} {order?.createdDate}</p>
                </div>
                <ActionOption
                    className="m-2"
                    actions={[
                        "Удалить",
                        "Сменить статус"
                    ]}
                    initLabel=""
                    label="Действие"
                    onValueChange={onActionSelected}
                />
            </div>

            {stateKey && <OrderProgressBar
                className={"mb-3"}
                currentState={OrderState[stateKey]}
            />}
            {iaWarning && (
                <div className="row">
                    <div className="col-6">
                        <Alert
                            additional={["alert-warning"]}
                            message={"Сумма введенных платеже превышает общую сумму заказа"}/>
                    </div>
                </div>

            )}
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
                                order={order}
                                onTabChange={handleTabChange}
                                onChangeItem={handleChangeOrderInfo}
                            />
                        </>
                    )}
                    {activeTab === 'payments' && (
                        <PaymentsInfo
                            orderId={orderId}
                            counterpartyId={order.counterparty?.id}
                            payments={payments}
                            onPaymentChanged={handleChangeOrderInfo}
                        />
                    )}
                    {activeTab === 'tasks' && (
                        <TaskInfo
                            orderId={orderId}
                            tasks={order.tasks || []}
                        />
                    )}
                    {activeTab === 'itemPage' && selectedItem && ( // Проверяем, выбран ли элемент
                        <ItemPage
                            className={cls.OrderPage}
                            item={selectedItem}
                            orderId={orderId}
                            onItemChanged={handleChangeOrderInfo}
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
