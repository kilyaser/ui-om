import {useTranslation} from "react-i18next";
import {classNames} from "../../../lib/classNames";
import {CreatePaymentRequest} from "../../../../clients/generated/commonApi/models";
import {paymentService} from "../../../../services";
import {useState} from "react";

interface PaymentFormProps {
    className?: string;
    orderId: string;
    counterpartyId?: string;
    onPaymentChanged: () => void;
}

export const PaymentForm = (props: PaymentFormProps) => {
    const {t} = useTranslation("order");
    const [paymentDate, setPaymentDate] = useState<string>("");
    const [paymentSum, setPaymentSum] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const {
        className,
        orderId,
        counterpartyId,
        onPaymentChanged,
    } = props

    const handleAddPayment = async () => {
        const newPayment: CreatePaymentRequest = {
            counterpartyId: counterpartyId || '',
            orderId: orderId,
            paymentDate,
            paymentSum,
        };

        try {
            await paymentService.addPayment(newPayment);
            onPaymentChanged();
        } catch (err) {
            setError("Ошибка при добавлении платежа");
            console.error(err);
        }
    }

    return (
        <div className={classNames("", {}, [className])}>
            <div className="mt-4">
                {error &&
                    <p className="text-danger">{error}</p>
                }
                <div className="row">
                    <div className="col-2">
                        <div className="mb-3">
                            <label>{t("Дата платежа")}</label>
                            <input
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                className="form-control mt-1"
                            />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="mb-3">
                            <label className="mb1">{t("Сумма платежа")}</label>
                            <input
                                type="number"
                                value={paymentSum}
                                onChange={(e) => setPaymentSum(Number(e.target.value))}
                                className="form-control mt-1"
                            />
                        </div>
                    </div>
                </div>


                <button onClick={handleAddPayment} className="btn btn-primary">
                    {t("Добавить")}
                </button>
            </div>
        </div>
    );
};
