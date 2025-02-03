
import cls from "./IntemInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {manyFormat} from "../../../shared/lib/manyFormat";
import {Button, Checkbox, IconButton, Tooltip, Typography} from "@mui/material";
import {ActiveTab} from "../ui/OrderPage";
import {ItemPreparationState} from "../../type";
import {Add} from "@mui/icons-material";
import {ItemForm} from "../../../shared/ui/ItemForm";
import RemoveIcon from '@mui/icons-material/Remove';
import {useState} from "react";
import {
    DeleteOrderItemRequest,
    UiOrderItem,
    UiOrderItemPreparationState
} from "../../../clients/generated/commonApi/models";
import DeleteIcon from "@mui/icons-material/Delete";
import orderItemService from "../../../services/order-item-service/OrderItemService";
import {CustomSnackbar} from "../../../shared/ui/Snackbar/ui/CustomSnackbar.tsx";

interface ItemInfoProps {
    className?: string;
    orderId: string;
    orderItems: UiOrderItem[];
    onTabChange: (tab: ActiveTab, item?: UiOrderItem) => void; // Функция для изменения активного таба
    onChangeItem: () => void
}


const ItemStateColor: Record<UiOrderItemPreparationState, string> = {
    NOT_STARTED: cls.yellow,
    IN_PROCESS: cls.blue,
    DONE: cls.green,
}

export const ItemInfo = (props: ItemInfoProps) => {
    const {t} = useTranslation("order");
    const {
        className,
        orderId,
        orderItems,
        onTabChange,
        onChangeItem,
    } = props

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [isItemFormVisible, setItemFormVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const onChangeItems = async () => {
        onChangeItem();
    }

    const toggleItemForm = () => {
        setItemFormVisible(prev => !prev);
    }

    const handleCheckBoxChange = (itemId: string) => {
        setSelectedItems((prevSelected) => {
           if (prevSelected.includes(itemId)) {
               return prevSelected.filter(id => id !== itemId);
           } else {
               return [...prevSelected, itemId];
           }
        });
    };

    const handleDeleteSelected = async () => {
        const req: DeleteOrderItemRequest = {
            orderId: orderId,
            deleteItemIds: selectedItems,
        }
        try {
            await orderItemService.deleteItems(req);
            setSelectedItems([]);
            onChangeItem()
            handleSnackbarOpen("Позиции заказа были успешно удалены", "success")
        } catch (error) {
            console.error(error);
            handleSnackbarOpen(`При удалении заказа возникла ошибка: ${error}`, "error")
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleSnackbarOpen = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    return (
        <div className={classNames("", {}, [className])}>
            {orderItems && orderItems.length > 0 && (
                <div className="order-items">
                    <div className="text-start mb-3">
                        <p className="font-monospace fs-5">Позиции заказа</p>
                        <div className="row mb-2">
                            <Typography className="col-1 p-1 order-first text-center bg-light font-monospace fs-6">№</Typography>
                            <Typography className="col-4 p-1 bg-light font-monospace fs-6">{t("Наименование")}</Typography>
                            <Typography className="col-1 p-1 text-center bg-light font-monospace fs-6">{t("Статус")}</Typography>
                            <Typography className="col-1 p-1 text-center bg-light font-monospace fs-6">{t("Кол-во")}</Typography>
                            <Typography className="col-1 p-1 text-center bg-light font-monospace fs-6">{t("Отгружено")}</Typography>
                            <Typography className="col-1 p-1 text-center bg-light font-monospace fs-6">{t("Цена")}, ₽</Typography>
                            <Typography className="col-2 p-1 order-last text-center bg-light font-monospace fs-6">{t("Сумма")}</Typography>
                        </div>
                        {orderItems.map((item, index) => (
                            <div className={`row mt-2 ${cls.pointer}`} key={item.id}>
                                <Typography className="col-1 p-1 order-first text-center border font-monospace fs-6" onClick={() => onTabChange("itemPage", item)}>{index + 1}</Typography>
                                <Typography className={`col-4 p-1 border font-monospace fs-6`} onClick={() => onTabChange("itemPage", item)}>{item.product?.productName}</Typography>
                                <Typography className={`col-1 p-1 text-center border font-monospace fs-6`} onClick={() => onTabChange("itemPage", item)}>
                                    <span className={`${cls.badge} ${ItemStateColor[item.preparationState || "NOT_STARTED"]}`}>
                                        {ItemPreparationState[item.preparationState || "NOT_STARTED"]}
                                    </span>
                                </Typography>
                                <Typography className="col-1 p-1 text-center border font-monospace fs-6" onClick={() => onTabChange("itemPage", item)}>{item.quantity}</Typography>
                                <Typography className="col-1 p-1 text-center border font-monospace fs-6" onClick={() => onTabChange("itemPage", item)}>{item.quantityShipped}</Typography>
                                <Typography className="col-1 p-1 text-center border font-monospace fs-6" onClick={() => onTabChange("itemPage", item)}>{manyFormat(item.pricePerProduct)}</Typography>
                                <Typography className="col-2 p-1 text-center border font-monospace fs-6" onClick={() => onTabChange("itemPage", item)}>{manyFormat(item.totalPrice)}</Typography>
                                <Typography className="col-1 p-1 text-start">
                                    <Checkbox
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleCheckBoxChange(item.id)}
                                        color="primary"
                                    />
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className={"mb-2"}>
                <Button
                    startIcon={isItemFormVisible ? <RemoveIcon/> : <Add/>}
                    onClick={toggleItemForm}
                >
                    <Typography variant="button">Добавить позицию</Typography>
                </Button>
                <Tooltip title={t("Удалить")}>
                    <IconButton
                        disabled={selectedItems.length === 0}
                        onClick={handleDeleteSelected}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </Tooltip>
            </div>

            {isItemFormVisible && (
                <ItemForm
                    orderId={orderId}
                    onItemChange={onChangeItems}
                />
            )}
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </div>
    );
};
