import cls from "./OrderInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {UiOrder} from "../../../clients/generated/commonApi/models";
import {manyFormat} from "../../../shared/lib/manyFormat";
import {OrderState} from "../../type";


interface OrderInfoProps {
    className?: string;
    order: UiOrder;
}

export const OrderInfo = (props: OrderInfoProps) => {
    const {t} = useTranslation("order");
    const {
        className,
        order
    } = props;

    const totalPayments = order?.payments?.reduce((sum, payment) => sum + (payment.paymentSum || 0), 0) || 0;

    return (
        <div className={classNames(cls.OrderInfo, {}, [className])}>
            <div className="order-items">
                <div className="text-start mb-3">
                    <div className="row mb-1">
                        <div className="col-2 order-first">
                            <strong>{t("Контрагент")}:</strong>
                        </div>
                        <div className="col-2">
                            <span>{order.counterparty?.name}</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-2 order-first">
                            <strong>{t("ГОЗ")}:</strong>
                        </div>
                        <div className="col-2">
                            <span>{order.governmentOrder ? 'Да' : 'Нет'}</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-2 order-first">
                            <strong>{t("Оплачено")}:</strong>
                        </div>
                        <div className="col-2">
                            <span>{manyFormat(totalPayments)} {t("руб")}.</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-2 order-first">
                            <strong>{t("Задолженность")}:</strong>
                        </div>
                        <div className="col-2">
                            <span>{manyFormat(order.debtSum)} {t("руб")}.</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-2 order-first">
                            <strong>{t("Дата завершения")}:</strong>
                        </div>
                        <div className="col-2">
                            <span>{order.completionDate}</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-2 order-first">
                            <strong>{t("Статус")}:</strong>
                        </div>
                        <div className="col-2">
                            <span> {order.orderState && OrderState[order.orderState]
                                ? OrderState[order.orderState] : ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
