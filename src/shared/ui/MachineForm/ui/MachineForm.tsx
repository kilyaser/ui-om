import {classNames} from "../../../lib/classNames";
import {useState} from "react";
import {
    CreateMachineRequest,
    CreateMachineRequestMachineType
} from "../../../../clients/generated/commonApi/models";
import {Autocomplete, TextField} from "@mui/material";
import {ErrorDisplay} from "../../ErrorDisplay";
import machinesService from "../../../../services/machines-service/MachinesService";

interface MachineFormProps {
    className?: string;
    onClose: () => void;
    onMachineCreated: () => void;
}


type FieldValue = string | CreateMachineRequestMachineType | undefined

export const machineType: Record<string, CreateMachineRequestMachineType> = {
    "Трех осевой": CreateMachineRequestMachineType.THREE_AXIS,
    "Пяти осевой": CreateMachineRequestMachineType.FIVE_AXIS
};

interface OptionType {
    label: string;
    inputValue?: string; // Для новых опций, которые будут созданы
}

export const MachineForm = (props: MachineFormProps) => {

    const {
        className,
        onClose,
        onMachineCreated,
    } = props

    const [error, setError] = useState<Error | null>(null);
    const [isChanged, setIsChanged] = useState(false);
    const [machineData, setMachineData] = useState<CreateMachineRequest>({
        name: "",
        machineType: CreateMachineRequestMachineType.THREE_AXIS,
    });

    const machineOptions: OptionType[] = [
        {label: "Трех осевой"},
        {label: "Пяти осевой"}
    ]


    const handleCrateMachine = async () => {
        if (!machineData.name) {
            return;
        }
        try {
            await machinesService.crateMachine(machineData);
            onMachineCreated();
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            }
        }
    }

    const handleFieldChange = (field: keyof CreateMachineRequest, value: FieldValue) => {
        setMachineData(prevData => ({
            ...prevData,
            [field]: value
        }));
        setIsChanged(true); // Устанавливаем флаг изменения
    };

    const onMachineTypeSelected = (newValue: OptionType | null) => {
        if (newValue) {
            handleFieldChange("machineType", machineType[newValue.label]);
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
                            <h1 className="modal-title fs-5 d-block">Форма создания Контрагента</h1>
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
                            label="Наименование станка"
                            variant="outlined"
                            value={machineData?.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            fullWidth
                            options={machineOptions}
                            onChange={(_, newValue) => onMachineTypeSelected(newValue)}
                            renderInput={(params) => <TextField {...params} label="Тип станка" />}
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
                        onClick={handleCrateMachine}
                        disabled={!isChanged}
                    >
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
};
