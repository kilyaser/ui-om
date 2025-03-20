import {Autocomplete, Checkbox, Chip, IconButton, TextField, Tooltip, Typography} from "@mui/material";

import {UiEstablishMachineRequest, UiMachineShort, UiOrderItem} from "../../../../clients/generated/commonApi/models";
import EditIcon from "@mui/icons-material/Edit";
import {useCallback, useEffect, useState} from "react";
import machineService from "../../../../services/machines-service/MachinesService";
import CheckIcon from '@mui/icons-material/Check';
import orderItemService from "../../../../services/order-item-service/OrderItemService";
import ClearIcon from '@mui/icons-material/Clear';
import {CustomSnackbar} from "../../Snackbar/ui/CustomSnackbar";

interface ItemPositionPartProps {
    item: UiOrderItem;
}

interface OptionType {
    label: string;
    id: string;
    inputValue?: string;
    isOccupied?: boolean;
    itemId?: string;
}

export const ItemMachinePosition = (props: ItemPositionPartProps) => {
    const {
        item
    } = props;

    const [machinesOptions, setMachinesOptions] = useState<OptionType[]>([]);
    const [selectedMachines, setSelectedMachines] = useState<OptionType[]>(item.machines?.map(machine => ({
        label: machine.name,
        id: machine.id,
    })) || []);
    const [error, setError] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [machines, setMachines] = useState<UiMachineShort[]>(item.machines || [])
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleSnackbarOpen = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const fetchMachines = useCallback(async () => {
        try {
            const data = await machineService.findAllMachines();
            const filteredMachines = data.machines?.filter(machine =>
                !machine.orderItem?.id || machine.orderItem.id === item.id
            ) || [];
            setMachinesOptions(filteredMachines.map(machine => ({
                label: machine.name,
                id: machine.id,
                isOccupied: machine.isOccupied,
                itemId: machine.orderItem?.id
            })) || []);
        } catch (error) {
            console.error(error);
            setError("Ошибка при назначении");
        }
    }, [item.id]);

    const fetchOccupiedMachines = async () => {
        try {
            const data = await machineService.getOccupiedMachineByItemId(item.id);
            setMachines(data.machines || []);
        } catch (error) {
            console.error(error);
            setError("Ошибка при извлечении занятых станков")
        }
    }

    useEffect(() => {
        fetchMachines().catch(error => {
            console.error(error);
            setError("Ошибка при извлечении информации о станках");
        });
    }, [fetchMachines]);

    const handleEdit = () => {
        setIsEdit(prev => !prev);
    };

    const establishMachines = async () => {
        try {
            const req: UiEstablishMachineRequest = {
                orderItemId: item.id,
                machineIds: selectedMachines.map(machine => machine.id) //выбранные id станков
            }
            await orderItemService.establishMachines(req);
            handleEdit();
            fetchOccupiedMachines();
            handleSnackbarOpen(`Назначение станка(ов) успешно изменено на позицию: ${item.product?.productName}`, "success");
        } catch (error) {
            console.error(error);
            handleSnackbarOpen(`Ошибка при назначении станка ${error}`, "error");
        }
    };

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            {isEdit ? (
                    <div className="row">
                        <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                            Станок ЧПУ:
                        </Typography>
                        <Typography className="col-3 p-2 border text-center" variant="body1" gutterBottom>
                            <div>
                                <Autocomplete
                                    multiple
                                    id="fixed-tags"
                                    value={selectedMachines}
                                    onChange={(_, newValue) => {
                                        setSelectedMachines(newValue)
                                    }}
                                    options={machinesOptions}
                                    getOptionLabel={(option) => option.label}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => {
                                            const {key, ...tagProps} = getTagProps({index});
                                            return (
                                                <Chip
                                                    key={key}
                                                    label={option.label}
                                                    {...tagProps}
                                                />
                                            );
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="Станки" placeholder="Назначить на станок"/>
                                    )}
                                    renderOption={(props, option) => {
                                        const disabled = selectedMachines.some(machine => machine.id === option.id) || option.isOccupied;
                                        return (
                                            <li {...props} style={{opacity: disabled ? 0.5 : 1}}>
                                                <Checkbox
                                                    checked={selectedMachines.some(machine => machine.id === option.id)}
                                                    disabled={disabled}
                                                />
                                                {option.label}
                                            </li>
                                        );
                                    }}
                                />
                            </div>
                        </Typography>
                        <div className="col-1 p-2">
                            <Tooltip title={"Подтвердить"}>
                                <IconButton
                                    color="primary"
                                    onClick={establishMachines}
                                >
                                    <CheckIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Отменить"}>
                                <IconButton
                                    color="primary"
                                    onClick={() => setIsEdit(false)}
                                >
                                    <ClearIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>)
                : (<div className="row">
                        <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                            Станок ЧПУ:
                        </Typography>
                        <Typography className="col-3 p-2 border text-center" variant="body1" gutterBottom>
                            <div>
                                {machines.length > 0 ? (<div className="d-flex flex-wrap">
                                    {machines.map((machine) => (
                                        <Chip className={"m-1"} key={machine.id} label={machine.name}/>
                                    ))}

                                </div>) : (<div>Не назначено</div>)}
                            </div>
                        </Typography>
                        <div className="col-1 p-2">
                            <Tooltip title={"Редактировать"}>
                                <IconButton
                                    color="primary"
                                    onClick={handleEdit}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                )
            }
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </div>
    );
};
