// import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {
    type SearchRequest,
    UiOrderItem,
    UiOrderItemPreparationState,
    UiProducts
} from "../../../clients/generated/commonApi/models";
import {Autocomplete, Button, Grid2, InputAdornment, TextField, Typography} from "@mui/material";
import productService from "../../../services/product-service/ProductService";
import {useState} from "react";
import {ItemPreparationState} from "../../type";
import {CustomSnackbar} from "../../../shared/ui/Snackbar/ui/CustomSnackbar";
import cls from "./IteamPage.module.scss";

interface OptionType {
    label: string;
    id?: string; // id может быть неопределенным для новых опций
    inputValue?: string; // Для новых опций, которые будут созданы
}

interface ItemPageProps {
    className?: string;
    item: UiOrderItem;
}

const ItemStateColor: Record<UiOrderItemPreparationState, string> = {
    NOT_STARTED: cls.yellow,
    IN_PROCESS: cls.blue,
    DONE: cls.green,
}

export const ItemPage = (props: ItemPageProps) => {
    // const {t} = useTranslation();
    const {className, item} = props;

    // Состояние для хранения опций
    const [options, setOptions] = useState<OptionType[]>([
        {label: item.product?.productName || "", id: item.product?.productId},
    ]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handleSnackbarOpen = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleSearchProduct = async (search: string) => {
        if (search.length < 3) {
            return;
        }
        const req: SearchRequest = {
            search: search,
        };
        try {
            const data: UiProducts = await productService.searchProducts(req);
            const newOptions = data.products?.map(product => ({
                label: product.productName || "",
                id: product.productId,
            })) || [];
            // Обновляем опции, добавляя новые, если они не совпадают с текущим значением
            const currentOption = {label: item.product?.productName || '', id: item.product?.productId};
            const updatedOptions = [currentOption, ...newOptions.filter(option => option.label !== currentOption.label)];

            setOptions(updatedOptions);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateProduct = async (productName: string) => {
        try {
            const newProduct = await productService.createProduct(productName);
            setOptions(prevOptions => [
                ...prevOptions,
                {label: newProduct.productName || "", id: newProduct.productId}
            ]);
            handleSnackbarOpen(`Продукт "${newProduct.productName}" успешно добавлен.`, 'success');
        } catch (error) {
            console.error("Error creating product:", error);
            handleSnackbarOpen('Ошибка при добавлении продукта.', 'error');
        }
    };

    const handleInputChange = (newInputValue: string) => {
        if (newInputValue) {
            handleSearchProduct(newInputValue);
        } else {
            setOptions([{label: item.product?.productName || '', id: item.product?.productId}]);
        }
    };

    const handleValueChange = (newValue: OptionType | string | null) => {
        if (typeof newValue === 'string') {
            // Если пользователь ввел новое значение, которое не существует в списке
            const isExisting = options.some(option => option.label === newValue);
            if (!isExisting) {
                handleCreateProduct(newValue);
            }
        } else if (newValue?.inputValue) {
            // Если выбрана опция "Добавить"
            handleCreateProduct(newValue.inputValue);
        }
    };

    // Метод для фильтрации опций
    const filterOptions = (options: OptionType[], {inputValue}: { inputValue: string }) => {
        const filtered = options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
        const isExisting = options.some(option => inputValue === option.label);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                inputValue,
                label: `Добавить "${inputValue}"`, // Сообщение о добавлении
            });
        }
        return filtered;
    };

    // Метод для получения метки опции
    const getOptionLabel = (option: OptionType | string): string => {
        if (typeof option === 'string') {
            return option; // Если это строка, просто возвращаем ее
        }
        return option.inputValue || option.label; // Если это объект, возвращаем label
    };

    // Метод для рендеринга опции
    const renderOption = (props: React.HTMLProps<HTMLLIElement>, option: OptionType | string) => {
        const {key, ...optionProps} = props;
        return (
            <li key={key} {...optionProps}>
                {typeof option === 'string' ? option : option.label}
            </li>
        );
    };

    return (
        <div className={classNames("", {}, [className])}>
            <div className={`mb-5 ${cls.info}`}>
                <div className="row">
                    <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                        Статус готовности:
                    </Typography>
                    <Typography className={`col-2 p-2 border text-center`} variant="body1" gutterBottom>
                        <span className={`${cls.badge} ${ItemStateColor[item.preparationState || "NOT_STARTED"]}`}>
                            {ItemPreparationState[item.preparationState || 'NOT_STARTED']}
                        </span>
                    </Typography>
                </div>
                <div className="row">
                    <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                        Наличие программа ЧПУ:
                    </Typography>
                    <Typography className="col-2 p-2 border text-center" variant="body1" gutterBottom>
                        {item.isProgramWritten ? "Да" : "Нет"}
                    </Typography>
                </div>
                <div className="row">
                    <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                        Станок ЧПУ:
                    </Typography>
                    <Typography className="col-2 p-2 border text-center" variant="body1" gutterBottom>
                        {item.machineId} список опций
                    </Typography>
                </div>
                <div className="row">
                    <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                        Материал:
                    </Typography>
                    <Typography className="col-2 p-2 border text-center" variant="body1" gutterBottom>
                        {item.material?.materialType}
                    </Typography>
                </div>
                <div className="row">
                    <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                        Тип изделия
                    </Typography>
                    <Typography className="col-2 p-2 border text-center" variant="body1" gutterBottom>
                        {item.productType}
                    </Typography>
                </div>
            </div>


            <Grid2 container spacing={2}>
                <Grid2 size={3}>
                    <Autocomplete
                        options={options}
                        defaultValue={options[0]}
                        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
                        onChange={(_, newValue) => handleValueChange(newValue)}
                        getOptionLabel={getOptionLabel} // Используем метод для получения метки
                        renderInput={(params) => <TextField {...params} label="Наименование позиции"/>}
                        freeSolo // Позволяет вводить произвольные значения
                        filterOptions={filterOptions}
                        renderOption={renderOption} // Используем метод для рендеринга опции
                    />
                </Grid2>
                <Grid2 size={1}>
                    <TextField
                        id="filled-number"
                        label="Кол-во"
                        type="number"
                        defaultValue={item.quantity}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </Grid2>
                <Grid2 size={1}>
                    <TextField
                        id="filled-number"
                        label="Отгружено"
                        type="number"
                        defaultValue={item.quantityShipped}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </Grid2>
                <Grid2 size={2}>
                    <TextField
                        id="filled-price"
                        label="Цена"
                        type="number"
                        defaultValue={item.pricePerProduct}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                            },
                        }}
                    />
                </Grid2>
                <Grid2 size={2}>
                    <TextField
                        id="filled-total-price"
                        label="Стоимость"
                        type="number"
                        defaultValue={item.totalPrice}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                            },
                        }}
                    />
                </Grid2>
            </Grid2>
            <Button className={"mt-5"} variant="contained" disabled={true}>
                Сохранить
            </Button>
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </div>
    );
};
