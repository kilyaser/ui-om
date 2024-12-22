import cls from "./PaymentsInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames.ts";
import {UiPaymentShort} from "../../../clients/generated/commonApi/models";
import {manyFormat} from "../../../shared/lib/manyFormat.ts";

interface PaymentsInfoProps {
    className?: string;
    payments: UiPaymentShort[];
}

export const PaymentsInfo = (props: PaymentsInfoProps) => {
    const {t} = useTranslation("order");
    const {
        className,
        payments,
    } = props;

    const totalPayments = payments.reduce((sum, payment) => sum + (payment.paymentSum || 0), 0) || 0;

    return (
        <div className={classNames(cls.PaymentsInfo, {}, [className])}>
            {payments && payments.length > 0 ? (
                <div className="text-center">
                    <div className="row">
                        <div className="col-1 border bg-light">№</div>
                        <div className="col-3 border bg-light">{t("Дата")}</div>
                        <div className="col-2 border bg-light">{t("Сумма")}, ₽</div>
                    </div>
                    {payments.map((payment, index) => (
                        <div className="row" key={payment.paymentId}>
                            <div className="col-1 border">{index + 1}</div>
                            <div className="col-3 border">
                                {payment.paymentDate || t("Дата платежа не задана")}
                            </div>
                            <div className="col-2 border">{manyFormat(payment.paymentSum)}</div>
                        </div>
                    ))}
                    <div className="row mt-1">
                        <div className="col-1">
                            <strong>{t("Всего")}:</strong>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-2 text-center">
                            <strong>{manyFormat(totalPayments)}</strong>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-muted">{t("Нет доступных платежей")}</p>
            )}
        </div>
    );
};
