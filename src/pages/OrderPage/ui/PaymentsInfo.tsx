import cls from "./PaymentsInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {manyFormat} from "../../../shared/lib/manyFormat";
import {PaymentForm} from "../../../shared/ui/PaymentForm";
import {UiPaymentShort} from "../../../clients/generated/commonApi/models";
import {paymentService} from "../../../services";

interface PaymentsInfoProps {
    className?: string;
    orderId: string;
    counterpartyId?: string;
    payments: UiPaymentShort[];
    onPaymentChanged: () => void;
}

export const PaymentsInfo = (props: PaymentsInfoProps) => {
    const {t} = useTranslation("order");

    const {
        className,
        payments,
        orderId,
        counterpartyId,
        onPaymentChanged,

    } = props;

    const totalPayments = payments.reduce((sum, payment) => sum + (payment.paymentSum || 0), 0) || 0;

    const handleDeletePayment = async (paymentId: string) => {
        try {
            await paymentService.deletePayment(paymentId); // Удаляем платеж
            onPaymentChanged(); // Вызываем обработчик удаления
        } catch (err) {
            console.error("Ошибка при удалении платежа", err);
        }
    };

    return (
        <div className={classNames(cls.PaymentsInfo, {}, [className])}>
            {payments && payments.length > 0 ? (
                <div className="text-center">
                    <div className="row">
                        <div className="col-1 border bg-light">№</div>
                        <div className="col-4 border bg-light">{t("Дата")}</div>
                        <div className="col-2 border bg-light">{t("Сумма")}, ₽</div>
                        <div className="col-1"></div>
                    </div>
                    {payments.map((payment, index) => (
                        <div className="row" key={payment.paymentId}>
                            <div className="col-1 border">{index + 1}</div>
                            <div className="col-4 border">
                                {payment.paymentDate || t("Дата платежа не задана")}
                            </div>
                            <div className="col-2 border">{manyFormat(payment.paymentSum)}</div>
                            <div className="col-1 text-start">
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => handleDeletePayment(payment.paymentId || "")} // Обработчик нажатия
                                ></button>
                            </div>
                        </div>
                    ))}
                    <div className="row mt-1">
                        <div className="col-1">
                            <strong>{t("Всего")}:</strong>
                        </div>
                        <div className="col-4"></div>
                        <div className="col-2 text-center">
                            <strong>{manyFormat(totalPayments)}</strong>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-muted">{t("Нет доступных платежей")}</p>
            )}
            <PaymentForm
                orderId={orderId}
                counterpartyId={counterpartyId}
                onPaymentChanged={onPaymentChanged}
            />
        </div>
    );
};
