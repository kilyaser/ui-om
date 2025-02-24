// import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {
    OrderItemFieldsPatch,
    type SearchRequest,
    UiOrderItem,
    UiProducts
} from "../../../clients/generated/commonApi/models";
import {Autocomplete, Button, Grid2, InputAdornment, TextField} from "@mui/material";
import productService from "../../../services/product-service/ProductService";
import orderItemService from "../../../services/order-item-service/OrderItemService";
import {useEffect, useState} from "react";
import {CustomSnackbar} from "../../../shared/ui/Snackbar/ui/CustomSnackbar";
import {ItemPositionInfo} from "../ItemPositionInfo/ItemPositionInfo";
import {manyFormat} from "../../../shared/lib/manyFormat";

interface OptionType {
    label: string;
    id?: string; // id может быть неопределенным для новых опций
    inputValue?: string; // Для новых опций, которые будут созданы
}

interface ItemPageProps {
    className?: string;
    item: UiOrderItem;
    orderId: string;
    onItemChanged: () => void;
}

type FieldValue = string | number | undefined;

export const ItemPage = (props: ItemPageProps) => {
    // const {t} = useTranslation();
    const {
        className,
        item,
        orderId,
        onItemChanged,
    } = props;

    // Состояние для хранения опций
    const [options, setOptions] = useState<OptionType[]>([
        {label: item.product?.productName || "", id: item.product?.productId},
    ]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    // Состояние для отслеживания изменений
    const [totalPrice, setTotalPrice] = useState(item.totalPrice);
    const [vatSum, setVatSum] = useState(item.vat);
    const [totalSumWithVat, setTotalSumWithVat] = useState(item.totalPrice);
    const [isChanged, setIsChanged] = useState(false);
    const [formData, setFormData] = useState<OrderItemFieldsPatch>({
        itemId: item.id || "",
        pricePerProduct: item.pricePerProduct,
        quantity: item.quantity ,
        quantityShipped: item.quantityShipped,
        productId: item.product?.productId,
    });
    const isVatIncluded = item.vatInclude;
    const vatRate = 20;

    // useEffect для обновления состояния при изменении item
    useEffect(() => {
        setOptions([{label: item.product?.productName || "", id: item.product?.productId}]);
        setFormData({
            itemId: item.id || "",
            pricePerProduct: item.pricePerProduct,
            quantity: item.quantity,
            quantityShipped: item.quantityShipped,
            productId: item.product?.productId,
            });
        setTotalPrice(item.totalPrice);
        setVatSum(item.vat);
        setTotalSumWithVat(item.currentSum)
    }, [item]);

    // useEffect для вычисления totalPrice
    useEffect(() => {
        const calculatedTotalPrice = (formData.pricePerProduct || 0) * (formData.quantity || 0);
        const calculatedVatSum = calculateVatSum(calculatedTotalPrice);
        setTotalPrice(calculatedTotalPrice);
        setVatSum(calculatedVatSum);
        setTotalSumWithVat(calculateTotalPriceWitchVat(calculatedTotalPrice));
    }, [formData.pricePerProduct, formData.quantity])

    const calculateVatSum = (totalPrice: number) => {
        const divisor = isVatIncluded ? 120 : 100;
        const vatSum = (totalPrice / divisor) * vatRate;
        return parseFloat(vatSum.toFixed(2));
    }

    const calculateTotalPriceWitchVat = (totalPrice: number) => {
        const totalPriceWithVat = isVatIncluded
            ? totalPrice
            : (totalPrice / 100 * vatRate) + totalPrice;
        return parseFloat(totalPriceWithVat.toFixed(2));
    }

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
            handleFieldChange('productId', newProduct.productId);
        } catch (error) {
            console.error("Error creating product:", error);
            handleSnackbarOpen('Ошибка при добавлении продукта.', 'error');
            setIsChanged(false);
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
        } else if (newValue) {
            // Если выбрана существующая опция
            handleFieldChange('productId', newValue.id); // Обновляем productId
        }
    };

    const handleFieldChange = (field: keyof OrderItemFieldsPatch, value: FieldValue) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
        setIsChanged(true); // Устанавливаем флаг изменения
    };

    const handleSave = async () => {
        try {
            const updatedItems = await orderItemService.updateOrderItems({
                itemId: formData.itemId,
                pricePerProduct: formData.pricePerProduct,
                quantity: formData.quantity,
                quantityShipped: formData.quantityShipped,
                productId: formData.productId,
            }, orderId);
            const items = updatedItems.orderItems || [];
            const updatedItem = items.find(item => item.id === formData.itemId);
            if (updatedItem) {
                onItemChanged();
            }
            handleSnackbarOpen('Данные успешно сохранены.', 'success');
            setIsChanged(false); // Сбрасываем флаг изменения
        } catch (error) {
            console.error("Error updating order items:", error);
            handleSnackbarOpen('Ошибка при сохранении данных.', 'error');
        }
    };

    const handleCancel = () => {
        setFormData({
            itemId: item.id || "",
            pricePerProduct: item.pricePerProduct,
            quantity: item.quantity,
            quantityShipped: item.quantityShipped,
            productId: item.product?.productId,
        });
        setOptions([{ label: item.product?.productName || "", id: item.product?.productId }]);
        setIsChanged(false); // Сбрасываем флаг изменения
        setTotalPrice(item.totalPrice);
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

    const handleTotalPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setTotalPrice(value);
    };

    return (
        <div className={classNames("", {}, [className])}>
            <ItemPositionInfo
                item={item}
            />
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
                        value={formData.quantity}
                        onChange={(e) => handleFieldChange('quantity', Number(e.target.value))}
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
                        value={formData.quantityShipped}
                        onChange={(e) => handleFieldChange('quantityShipped', Number(e.target.value))}
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
                        value={formData.pricePerProduct}
                        onChange={(e) => handleFieldChange('pricePerProduct', Number(e.target.value))}
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
                        value={totalPrice}
                        onChange={handleTotalPriceChange}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                            },
                        }}
                    />
                </Grid2>
            </Grid2>
            <div className="mt-5 ms-3">
                <div className="row">
                    <div className="col-2 p-1 font-monospace fs-6">НДС 20%:</div>
                    <div className="col-1">
                        {manyFormat(vatSum)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 p-1 font-monospace fs-6"><strong>Всего, вкл. НДС 20%:</strong></div>
                    <div className="col-1">
                        <strong>{manyFormat(totalSumWithVat)}</strong>
                    </div>
                </div>
            </div>
            <Button className={"mt-5"} variant="contained" disabled={!isChanged} onClick={handleSave}>
                Сохранить
            </Button>
            <Button className={"mt-5 ms-2"} variant="contained" disabled={!isChanged} onClick={handleCancel}>
                Отменить
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
