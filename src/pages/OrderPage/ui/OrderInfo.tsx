import cls from "./OrderInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames.ts";
import {UiOrder} from "../../../clients/generated/commonApi/models";
import {manyFormat} from "../../../shared/lib/manyFormat.ts";

interface OrderInfoProps {
    className?: string;
    order: UiOrder;
}

const orderStateTranslations = {
    NEW: 'Новый',
    IN_WORK: 'В работе',
    READY: 'Готов',
    SHIPPED: 'Отгружен',
    COMPLETED: 'Завершён',
    CANCELLED: 'Отменён',
};

export const OrderInfo = (props: OrderInfoProps) => {
    const {t} = useTranslation("order");
    const {
        className,
        order
    } = props;

    const totalPayments = order?.payments?.reduce((sum, payment) => sum + (payment.paymentSum || 0), 0) || 0;

    return (
        <div className={classNames(cls.OrderInfo, {}, [className])}>
            <div className="card border-light mb-3">
                <div className="card-header">{order.orderNumber} {t("от")} {order.createdDate}</div>
                <div className="card-body">
                    <h5 className="card-title">{order.orderName}</h5>
                    <p className="card-text">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"></li>
                            <li className="list-group-item d-flex justify-content-between">
                                <strong>{t("Контрагент")}:</strong>
                                <span>{order.counterparty?.name}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <strong>{t("Сумма")}:</strong>
                                <span>
                                             {manyFormat(order.currentSum)} {t("руб")}.,&nbsp;&nbsp;
                                    {t("НДС")}:&nbsp;&nbsp;{manyFormat(order.vat)} {t("руб")}.</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <strong>{t("Оплачено")}:</strong>
                                <span>{manyFormat(totalPayments)} {t("руб")}.</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <strong>{t("Задолженность")}:</strong>
                                <span>{manyFormat(order.debtSum)} {t("руб")}.</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <strong>{t("Дата завершения")}:</strong>
                                <span>{order.completionDate}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <strong>{t("Статус")}:</strong>
                                <span> {order.orderState && orderStateTranslations[order.orderState]
                                    ? orderStateTranslations[order.orderState]
                                    : ''}
                                         </span>
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    );
};
