import {classNames} from "../../../lib/classNames.ts";
import {useState} from "react";
import {Dayjs} from "dayjs";
import {CreateContractRequest, CreateContractRequestStatus} from "../../../../clients/generated/commonApi/models";
import {TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ActionOption} from "../../../../pages/OrderPage/ActionOption/ActionOption";
import contractsService from "../../../../services/contract-service/ContractsService";
import {ErrorDisplay} from "../../ErrorDisplay";


interface ContractFormProps {
    className?: string;
    onClose: () => void;
    onContractCreated: () => void;
    counterpartyId: string
}

type FieldValue = string | number | undefined;

export const ContractForm = (props: ContractFormProps) => {
    const {
        className,
        onClose,
        onContractCreated,
        counterpartyId
    } = props

    const [error, setError] = useState<Error | null>(null);
    const [isChanged, setIsChanged] = useState(false);
    const [contractDate, setContractDate] = useState<Dayjs | null>(null);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [contractData, setContractData] = useState<CreateContractRequest>({
        contractNumber: "",
        counterpartyId: counterpartyId,
        notes: "",
        startDate: "",
        status: CreateContractRequestStatus.ACTIVE
    });

    const handleFieldChange = (field: keyof CreateContractRequest, value: FieldValue) => {
        setContractData(prevData => ({
            ...prevData,
            [field]: value
        }));
        setIsChanged(true); // Устанавливаем флаг изменения
    };

    const onContractStateSelected = (state: string) => {
        handleFieldChange("status", state);
    }

    const handleCreateContract = async () => {
        const req: CreateContractRequest = {
            contractDate: contractDate ? contractDate.toISOString() : undefined,
            contractNumber: contractData.contractNumber,
            counterpartyId: contractData.counterpartyId,
            endDate: endDate ? endDate.toISOString() : undefined,
            notes: contractData.notes,
            startDate: startDate ? startDate?.toISOString() : undefined,
            status: contractData.status
        }

        try {
            await contractsService.createContract(req);
            onContractCreated();
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            }
        }
    }
    if (error) {
        return <ErrorDisplay error={error}/>
    }

    return (
        <div className={classNames("", {}, [className])}>
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
                            label="Номер договора"
                            variant="outlined"
                            value={contractData.contractNumber}
                            onChange={(e) => handleFieldChange('contractNumber', e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            className="mb-3"
                            label="Заменти к договору"
                            variant="outlined"
                            value={contractData.notes}
                            onChange={(e) => handleFieldChange('notes', e.target.value)}
                        />
                    </div>
                    <div>
                        <ActionOption
                            actions={[
                                CreateContractRequestStatus.ACTIVE,
                                CreateContractRequestStatus.COMPLETED,
                                CreateContractRequestStatus.SUSPENDED,
                                CreateContractRequestStatus.TERMINATED,
                            ]}
                            label={"Статус договора"}
                            initLabel={CreateContractRequestStatus.ACTIVE}
                            onValueChange={onContractStateSelected}
                        />
                    </div>
                    <div className="mt-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className="mb-2"
                                label="Дата договора"
                                value={contractDate}
                                onChange={(newValue) => setContractDate(newValue)}
                            />
                            <DatePicker
                                className="mb-2 ps-2"
                                label="Дата надачала"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                            />
                            <DatePicker
                                className="mb-2 ps-2"
                                label="Дата окончания"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                            />
                        </LocalizationProvider>
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
                        onClick={handleCreateContract}
                        disabled={!isChanged}
                    >
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
};
