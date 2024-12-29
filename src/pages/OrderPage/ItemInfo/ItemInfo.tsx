
import cls from "./IntemInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {UiOrderItem, UiOrderItemPreparationState} from "../../../clients/generated/commonApi/models";
import {manyFormat} from "../../../shared/lib/manyFormat";
import {Typography} from "@mui/material";
import {ActiveTab} from "../ui/OrderPage";
import {ItemPreparationState} from "../../type";

interface ItemInfoProps {
    className?: string;
    orderItems: UiOrderItem[];
    onTabChange: (tab: ActiveTab, item?: UiOrderItem) => void; // Функция для изменения активного таба
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
        orderItems,
        onTabChange,
    } = props

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
                            <div className={`row mt-2 ${cls.pointer}`} key={item.id} onClick={() => onTabChange("itemPage", item)}>
                                <Typography className="col-1 p-1 order-first text-center border font-monospace fs-6">{index + 1}</Typography>
                                <Typography className={`col-4 p-1 border font-monospace fs-6`}>{item.product?.productName}</Typography>
                                <Typography className={`col-1 p-1 text-center border font-monospace fs-6`}>
                                    <span className={`${cls.badge} ${ItemStateColor[item.preparationState || "NOT_STARTED"]}`}>
                                        {ItemPreparationState[item.preparationState || "NOT_STARTED"]}
                                    </span>
                                </Typography>
                                <Typography className="col-1 p-1 text-center border font-monospace fs-6">{item.quantity}</Typography>
                                <Typography className="col-1 p-1 text-center border font-monospace fs-6">{item.quantityShipped}</Typography>
                                <Typography className="col-1 p-1 text-center border font-monospace fs-6">{manyFormat(item.pricePerProduct)}</Typography>
                                <Typography className="col-2 p-1 order-last text-center border font-monospace fs-6">{manyFormat(item.totalPrice)}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
