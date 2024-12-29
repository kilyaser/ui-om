import cls from "./PaymentsInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {manyFormat} from "../../../shared/lib/manyFormat";
import {PaymentForm} from "../../../shared/ui/PaymentForm";
import {UiPaymentShort, UpdatePaymentRequest} from "../../../clients/generated/commonApi/models";
import {paymentService} from "../../../services";
import {useState} from "react";
import {Tooltip, Typography} from "@mui/material";

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
        <div className={classNames(cls.PaymentsInfo, {}, [className, "container-fluid"])}>
            <Typography className="font-monospace fs-5 mb-2">{t("Реестр платежей")}</Typography>
            {payments && payments.length > 0 ? (
                <div className="text-center mb-3">
                    <div className="row">
                        <Typography gutterBottom className="col-1 p-1 border bg-light font-monospace fs-6">№</Typography>
                        <Typography gutterBottom className="col-4 p-1 border bg-light font-monospace fs-6">{t("Дата")}</Typography>
                        <Typography gutterBottom className="col-2 p-1 border bg-light font-monospace fs-6">{t("Сумма")}, ₽</Typography>
                    </div>
                    {payments.map((payment, index) => (
                        <div className="row" key={payment.paymentId}>
                            <Typography gutterBottom className="col-1 p-1 border font-monospace fs-6">{index + 1}</Typography>
                            <Typography gutterBottom className="col-4 p-1 border font-monospace fs-6">
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
                            </Typography>
                            <Typography gutterBottom className="col-2 p-1 border font-monospace fs-6">
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
                            </Typography>
                            <Tooltip title={t("Удалить")}>
                                <div className="col-1 text-start">
                                    <button
                                        type="button"
                                        className="btn text-danger p-0"
                                        onClick={() => handleDeletePayment(payment.paymentId || "")} // Обработчик нажатия
                                    >
                                        Х
                                    </button>
                                </div>
                            </Tooltip>

                        </div>
                    ))}
                    <div className="row mt-1">
                        <div className="col-1 font-monospace fs-6">
                            <strong>{t("Всего")}:</strong>
                        </div>
                        <div className="col-4"></div>
                        <div className="col-2 text-center font-monospace fs-6">
                            <strong>{manyFormat(totalPayments)}</strong>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-muted">{t("Нет доступных платежей")}</p>
            )}
            <Tooltip title={t("Добавить платеж")}>
                <button
                    type="button"
                    className="btn btn-light mt-1"
                    onClick={togglePaymentForm}
                >
                    <strong>{isPaymentFormVisible ? '-' : '+'}</strong>
                </button>
            </Tooltip>

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