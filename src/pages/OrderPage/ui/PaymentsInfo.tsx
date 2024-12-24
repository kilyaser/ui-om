import cls from "./PaymentsInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {manyFormat} from "../../../shared/lib/manyFormat";
import {PaymentForm} from "../../../shared/ui/PaymentForm";
import {UiPaymentShort, UpdatePaymentRequest} from "../../../clients/generated/commonApi/models";
import {paymentService} from "../../../services";
import {useState} from "react";

interface PaymentsInfoProps {
    className?: string;
    orderId: string;
    counterpartyId?: string;
    payments: UiPaymentShort[];
    onPaymentChanged: () => void;
}

export const PaymentsInfo = (props: PaymentsInfoProps) => {
    const { t } = useTranslation("order");

    const {
        className,
        payments,
        orderId,
        counterpartyId,
        onPaymentChanged,
    } = props;

    const [isPaymentFormVisible, setPaymentFormVisible] = useState(false);
    const [editablePaymentId, setEditablePaymentId] = useState<string | null>(null);
    const [editedPaymentDate, setEditedPaymentDate] = useState<string>('');
    const [editedPaymentSum, setEditedPaymentSum] = useState<number | ''>('');
    const [originalPaymentDate, setOriginalPaymentDate] = useState<string>('');
    const [originalPaymentSum, setOriginalPaymentSum] = useState<number | ''>('');

    const totalPayments = payments.reduce((sum, payment) => sum + (payment.paymentSum || 0), 0) || 0;
    const handleDeletePayment = async (paymentId: string) => {
        try {
            await paymentService.deletePayment(paymentId); // Удаляем платеж
            onPaymentChanged(); // Вызываем обработчик удаления
        } catch (err) {
            console.error("Ошибка при удалении платежа", err);
        }
    };

    const handleEditPayment = (payment: UiPaymentShort) => {
        setEditablePaymentId(payment.paymentId || '');
        setEditedPaymentDate(payment.paymentDate || '');
        setEditedPaymentSum(payment.paymentSum || '');
        setOriginalPaymentDate(payment.paymentDate || '');
        setOriginalPaymentSum(payment.paymentSum || '');
    };

    const handleUpdatePayment = async (paymentId: string) => {
        if (editedPaymentDate !== originalPaymentDate || editedPaymentSum !== originalPaymentSum) {
            try {
                const request: UpdatePaymentRequest = {
                    patch: {
                        paymentDate: editedPaymentDate,
                        paymentSum: editedPaymentSum !== '' ? editedPaymentSum : undefined,
                    },
                    paymentId,
                };
                console.log("request", request);
                await paymentService.updatePayment(request);
                onPaymentChanged();
            } catch (err) {
                console.error("Ошибка при обновлении платежа", err);
            }
        }
        setEditablePaymentId(null);
    };

    const togglePaymentForm = () => {
        setPaymentFormVisible(prev => !prev); // Переключаем видимость формы
    };




    return (
        <div className={classNames(cls.PaymentsInfo, {}, [className])}>
            {payments && payments.length > 0 ? (
                <div className="text-center mb-3">
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
                                {editablePaymentId === payment.paymentId ? (
                                    <input
                                        className="form-control mt-1"
                                        type="date"
                                        value={editedPaymentDate}
                                        onChange={(e) => setEditedPaymentDate(e.target.value)}
                                        onBlur={() => handleUpdatePayment(payment.paymentId || '')}
                                    />
                                ) : (
                                    <span onClick={() => handleEditPayment(payment)} style={{ cursor: 'pointer' }}>
                                        {payment.paymentDate || t("Дата платежа не задана")}
                                    </span>
                                )}
                            </div>
                            <div className="col-2 border">
                                {editablePaymentId === payment.paymentId ? (
                                    <input
                                        className="form-control mt-1"
                                        type="number"
                                        value={editedPaymentSum}
                                        onChange={(e) => setEditedPaymentSum(Number(e.target.value))}
                                        onBlur={() => handleUpdatePayment(payment.paymentId || '')}
                                    />
                                ) : (
                                    <span onClick={() => handleEditPayment(payment)}>
                                        {manyFormat(payment.paymentSum)}
                                    </span>
                                )}
                            </div>
                            <div className="col-1 text-start">
                                <button
                                    type="button"
                                    className="btn text-danger p-0"
                                    onClick={() => handleDeletePayment(payment.paymentId || "")} // Обработчик нажатия
                                >
                                    Х
                                </button>
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

            <button
                type="button"
                className="btn btn-light mt-1"
                onClick={togglePaymentForm}
            >
                <strong>{isPaymentFormVisible ? '-' : '+'}</strong>
            </button>
            {isPaymentFormVisible && (
                <PaymentForm
                    orderId={orderId}
                    counterpartyId={counterpartyId}
                    onPaymentChanged={onPaymentChanged}
                />
            )}
        </div>
    );
};