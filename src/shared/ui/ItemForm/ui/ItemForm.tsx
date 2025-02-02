import {classNames} from "../../../lib/classNames";
import {useState} from "react";
import productService from "../../../../services/product-service/ProductService";
import {Autocomplete, Button, TextField, Typography} from "@mui/material";
import orderItemService from "../../../../services/order-item-service/OrderItemService";
import {CustomSnackbar} from "../../Snackbar/ui/CustomSnackbar";
import {UiProduct} from "../../../../clients/generated/commonApi/models";

interface ItemFormProps {
    className?: string;
    orderId: string;
    onItemChange: () => void;
}

interface OptionType {
    label: string;
    id?: string; // id может быть неопределенным для новых опций
    inputValue?: string; // Для новых опций, которые будут созданы
}

export const ItemForm = (props: ItemFormProps) => {
    const {
        className,
        orderId,
        onItemChange,
    } = props;

    const [options, setOptions] = useState<OptionType[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<UiProduct | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [isChanged, setIsChanged] = useState(false);

    const handleSearchProduct = async (search: string) => {
        setIsLoading(true);
        setError(null);
        const req = { search };

        try {
            const data = await productService.searchProducts(req);
            setOptions(data.products?.map(product => ({ label: product?.productName || '', id: product.productId })) || []);
        } catch (error) {
            console.error(error);
            setError("Ошибка при поиске продуктов.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProduct = async (newProductName: string) => {
        setIsLoading(true);
        try {
            const newProduct = await productService.createProduct(newProductName);
            setOptions(prevOptions => [
                ...prevOptions,
                { label: newProduct.productName || '', id: newProduct.productId }
            ]);
            setIsChanged(true);
            setError(null);
            handleSnackbarOpen(`Продукт "${newProduct.productName}" успешно добавлен.`, 'success');
            setSelectedProduct(newProduct)
            return newProduct;
        } catch (err) {
            console.error(err);
            handleSnackbarOpen('Ошибка при добавлении продукта.', 'error');
            setError("Ошибка при создании продукта.");
            setIsChanged(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddItemsToOrder = async (productId: string) => {
        if (productId) {
            try {
                const itemsRequest = [{ productId }];
                const itemsToAdd = { orderId, itemsRequest };
                await orderItemService.addItems(itemsToAdd);
                onItemChange(); // Обновление родительского компонента
                setOptions([]); // Сбросить список опций
                setIsChanged(false);
                handleSnackbarOpen(`Позиция успешно добавлена.`, 'success');
            } catch (err) {
                console.error(err);
                handleSnackbarOpen('Ошибка при добавлении позиции.', 'error');
                setError("Ошибка при добавлении позиций в заказ.");
            }
        }
    };

    const handleValueChange = (newValue: OptionType | string | null) => {
        if (typeof newValue === 'string') {
            const isExisting = options.some(option => option.label === newValue);
            if (!isExisting) {
                handleCreateProduct(newValue);
            }
        } else if (newValue?.inputValue) {
            handleCreateProduct(newValue.inputValue);
        } else if(newValue) {
            setSelectedProduct({
                productName: newValue.inputValue,
                productId: newValue.id
            });   // Сохраняем выбранный продукт
            setIsChanged(true);
        }
    };

    const handleAddButtonClick = async () => {
        if (selectedProduct) {
            await handleAddItemsToOrder(selectedProduct.productId!);
        }
    };

    // Метод для получения метки опции
    const getOptionLabel = (option: OptionType | string): string => {
        if (typeof option === 'string') {
            return option; // Если это строка, просто возвращаем ее
        }
        return option.inputValue || option.label; // Если это объект, возвращаем label
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

    const handleInputChange = (newInputValue: string) => {
        if (newInputValue) {
            handleSearchProduct(newInputValue);
        }
    };

    const renderOption = (props: React.HTMLProps<HTMLLIElement>, option: OptionType | string) => {
        const {key, ...optionProps} = props;
        return (
            <li key={key} {...optionProps}>
                {typeof option === 'string' ? option : option.label}
            </li>
        );
    };

    const handleSnackbarOpen = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className={classNames("", {}, [className])}>
            <div className={"rom"}>
                <div className={"col-5"}>
                    <Autocomplete
                        options={options}
                        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
                        onChange={(_, newValue) => handleValueChange(newValue)}
                        getOptionLabel={getOptionLabel}
                        renderInput={(params) => <TextField {...params} label="Наименование продукта"/>}
                        freeSolo
                        filterOptions={filterOptions}
                        loading={isLoading}
                        renderOption={renderOption}
                    />
                </div>
            </div>

            {error && <Typography color="error">{error}</Typography>}
            <Button
                className={"mt-2"}
                onClick={() => handleAddButtonClick()}
                variant="contained"
                disabled={!isChanged}
            >
                Добавить
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
