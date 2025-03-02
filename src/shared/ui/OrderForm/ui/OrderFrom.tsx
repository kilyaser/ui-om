import {classNames} from "../../../lib/classNames";
import {Autocomplete, FormControlLabel, Switch, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import counterpartyService from "../../../../services/counterparty-service/CounterpartyService";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import cls from "./OrderFrom.module.scss";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {type CreateOrderRequest, UiCounterparty} from "../../../../clients/generated/commonApi/models";
import {orderService} from "../../../../services";

interface OrderFromProps {
    className?: string;
    onClose: () => void;
    onOrderCreated: () => void;
    counterparty?: UiCounterparty;
}

interface OptionType {
    label: string;
    id: string;
    inputValue?: string; // Для новых опций, которые будут созданы
}

export const OrderFrom = (props: OrderFromProps) => {

    const {
        className,
        onClose,
        onOrderCreated,
        counterparty,
    } = props;

    const [options, setOptions] = useState<OptionType[]>([
        {label: counterparty?.name || "", id: counterparty?.id || ""},
    ]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [completionDate, setCompletionDate] = useState<Dayjs | null>(null);
    const [selectedCounterparty, setSelectedCounterparty] = useState<string | null>(null);
    const [orderName, setOrderName] = useState<string>('');
    const [isGovernmentOrder, setIsGovernmentOrder] = useState<boolean>(false);
    const [includeVAT, setIncludeVAT] = useState<boolean>(false);

    useEffect(() => {
        if (counterparty) {
            setSelectedCounterparty(counterparty.id);
        }
    }, [counterparty]);

    const handleSearchCounterparty = async (search: string) => {
        setIsLoading(true);
        setError(null);
        const req = {search};

        try {
            const data = await counterpartyService.searchCounterparty(req);
            setOptions(data.counterparties?.map(counterparty => ({
                label: counterparty.name,
                id: counterparty.id
            })) || []);
        } catch (error) {
            console.error(error);
            setError("Ошибка при поиске контрагентов.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (newInputValue: string) => {
        if (newInputValue) {
            handleSearchCounterparty(newInputValue);
        }
    };

    // Метод для получения метки опции
    const getOptionLabel = (option: OptionType | string): string => {
        if (typeof option === 'string') {
            return option; // Если это строка, просто возвращаем ее
        }
        return option.inputValue || option.label; // Если это объект, возвращаем label
    };

    const renderOption = (props: React.HTMLProps<HTMLLIElement>, option: OptionType | string) => {
        const {key, ...optionProps} = props;
        return (
            <li key={key} {...optionProps}>
                {typeof option === 'string' ? option : option.label}
            </li>
        );
    };

    const handleCreateOrder = async () => {
        const req: CreateOrderRequest = {
            completionDate: completionDate ? completionDate.toISOString() : undefined,
            counterpartyId: selectedCounterparty || '',
            isGovernmentOrder: isGovernmentOrder,
            isVatInclude: includeVAT,
            itemRequests: [], // Добавьте ваши элементы заказа здесь
            orderName,
        };

        try {
            await orderService.createOrder(req);
            // Здесь можно добавить логику для успешного создания заказа, например, уведомление пользователя
            onOrderCreated();
            onClose(); // Закрываем форму после успешного создания
        } catch (error) {
            console.error("Ошибка при создании заказа:", error);
            setError("Ошибка при создании заказа.");
        }
    };

    const handleValueChange = (newValue: OptionType | string | null) => {
        if (newValue && typeof newValue !== 'string') {
            setSelectedCounterparty(newValue.id);
        } else {
            // Если newValue - это строка или null, можно обработать это по своему усмотрению
            // Например, можно сбросить выбранного контрагента
            setSelectedCounterparty(null);
        }
    };

    return (
        <div className={classNames(cls.OrderForm, {}, [className])}>
            <div>
                <div className="modal-geader">
                    <div className="d-flex justify-content-between modal-header">
                        <div>
                            <h1 className="modal-title fs-5 d-block">Форма заказа</h1>
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
                            className="mb-2"
                            label="Наименование заказа"
                            variant="outlined"
                            value={orderName}
                            onChange={(e) => {
                                setOrderName(e.target.value);
                            }}
                        />

                        <Autocomplete
                            className="mt-2"
                            options={options}
                            defaultValue={options[0]}
                            onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
                            onChange={(_, newValue) => handleValueChange(newValue)}
                            getOptionLabel={getOptionLabel}
                            renderInput={(params) => <TextField {...params} label="Наименование контрагента"/>}
                            freeSolo
                            loading={isLoading}
                            renderOption={renderOption}
                        />
                    </div>
                    {error && <Typography color="error">{error}</Typography>}
                    <div>
                        <FormControlLabel
                            className="mt-2"
                            control={<Switch
                                checked={includeVAT}
                                onChange={(e) => {
                                    setIncludeVAT(e.target.checked)
                                }}
                            />} label="Включить НДС В стоимость"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            className="mt-2 mb-4"
                            control={<Switch
                                checked={isGovernmentOrder}
                                onChange={(e) => {
                                    setIsGovernmentOrder(e.target.checked)
                                }}
                            />} label="Признак Государственного заказа"
                        />
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Дата завершения"
                                value={completionDate}
                                onChange={(newValue) => setCompletionDate(newValue)}
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
                        onClick={handleCreateOrder}
                      >
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
};
