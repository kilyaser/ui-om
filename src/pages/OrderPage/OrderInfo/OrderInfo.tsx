import cls from "./OrderInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {UiOrder} from "../../../clients/generated/commonApi/models";
import {manyFormat} from "../../../shared/lib/manyFormat";
import {OrderState} from "../../type";
import {Typography} from "@mui/material";

const orderStateColors = {
    NEW: cls.blue,
    IN_WORK: cls.blue,
    READY: cls.blue,
    SHIPPED: cls.blue,
    COMPLETED: cls.green,
    CANCELLED: cls.red,
};

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
                    <p className="font-monospace fs-5">Информация о заказе</p>
                    <div className="row mb-1">
                        <Typography className="col-2 p-1 border bg-light font-monospace fs-6">
                            <strong>{t("Контрагент")}:</strong>
                        </Typography>
                        <Typography className="col-2 p-1 border font-monospace fs-6 text-center">
                            <span>{order.counterparty?.name}</span>
                        </Typography>
                    </div>
                    <div className="row mb-1">
                        <Typography className="col-2 p-1 border bg-light font-monospace fs-6">
                            <strong>{t("ГОЗ")}:</strong>
                        </Typography>
                        <Typography className="col-2 p-1 border text-center">
                            <span>{order.governmentOrder ? 'Да' : 'Нет'}</span>
                        </Typography>
                    </div>
                    <div className="row mb-1">
                        <Typography className="col-2 p-1 border bg-light font-monospace fs-6">
                            <strong>{t("Оплачено")}:</strong>
                        </Typography>
                        <Typography className="col-2 p-1 border font-monospace fs-6 text-center">
                            <span>{manyFormat(totalPayments)} {t("руб")}.</span>
                        </Typography>
                    </div>
                    <div className="row mb-1">
                        <Typography className="col-2 p-1 border bg-light font-monospace fs-6">
                            <strong>{t("Задолженность")}:</strong>
                        </Typography>
                        <Typography className="col-2 p-1 border font-monospace fs-6 text-center">
                            <span>{manyFormat(order.debtSum)} {t("руб")}.</span>
                        </Typography>
                    </div>
                    <div className="row mb-1">
                        <Typography className="col-2 p-1 border bg-light font-monospace fs-6">
                            <strong>{t("Дата завершения")}:</strong>
                        </Typography>
                        <Typography className="col-2 p-1 border font-monospace fs-6 text-center">
                            <span>{order.completionDate}</span>
                        </Typography>
                    </div>
                    <div className="row mb-1">
                        <Typography className="col-2 p-1 border bg-light font-monospace fs-6">
                            <strong>{t("Статус")}:</strong>
                        </Typography>
                        <Typography className="col-2 p-1 border font-monospace fs-6 text-center">
                            <span
                                className={`${cls.badge} ${orderStateColors[order.orderState || "NEW"]}`}> {order.orderState && OrderState[order.orderState]
                                ? OrderState[order.orderState] : ''}
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};
