import {classNames} from "../../../lib/classNames";
import {CreateCounterpartyRequest} from "../../../../clients/generated/commonApi/models";
import {useState} from "react";
import counterpartyService from "../../../../services/counterparty-service/CounterpartyService";
import {ErrorDisplay} from "../../ErrorDisplay";
import {TextField} from "@mui/material";
import cls from "./CounterpartyForm.module.scss";

interface CounterpartyFormProps {
    className?: string;
    onClose: () => void;
    onCounterpartyCreated: () => void;
}

type FieldValue = string | number | undefined;

export const CounterpartyForm = (props: CounterpartyFormProps) => {

    const {
        className,
        onClose,
        onCounterpartyCreated,
    } = props

    const [counterpartyData, setCounterpartyData] = useState<CreateCounterpartyRequest | null>(null);
    const [isChanged, setIsChanged] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleCraateCounterparty = async () => {
        if (!counterpartyData) {
            return;
        }
        try {
            await counterpartyService.createCounterparty(counterpartyData);
            onCounterpartyCreated();
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            }
        }
    }

    const handleFieldChange = (field: keyof CreateCounterpartyRequest, value: FieldValue) => {
        setCounterpartyData(prevData => ({
            ...prevData,
            [field]: value
        }));
        setIsChanged(true); // Устанавливаем флаг изменения
    };

    if (error) {
        return <ErrorDisplay error={error}/>
    }

    return (
        <div className={classNames(cls.counterparty, {}, [className])}>
            <div>
                <div className="modal-geader">
                    <div className="d-flex justify-content-between modal-header">
                        <div>
                            <h1 className="modal-title fs-5 d-block">Форма создания Договора</h1>
                        </div>
                        <div>
                            <button type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={onClose}
                            ></button>
                        </div>
                    </div>
                </div>
                <div className="modal-body">
                    <div>
                        <TextField
                            fullWidth
                            className="mb-3"
                            label="Полное наименование контрагента"
                            variant="outlined"
                            value={counterpartyData?.fullName}
                            onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            className="mb-3"
                            label="Наименование контрагента"
                            variant="outlined"
                            value={counterpartyData?.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            className="mb-3"
                            label="ИНН"
                            variant="outlined"
                            value={counterpartyData?.inn}
                            onChange={(e) => handleFieldChange('inn', e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            className="mb-3"
                            type="email"
                            label="email"
                            variant="outlined"
                            value={counterpartyData?.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            className="mb-3"
                            label="Телефон"
                            variant="outlined"
                            value={counterpartyData?.phone}
                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={onClose}
                    >
                        Отмена
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCraateCounterparty}
                        disabled={!isChanged}
                    >
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
};
