
import cls from "./IntemInfo.module.scss";
import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames.ts";
import {UiOrderItem} from "../../../clients/generated/commonApi/models";
import {manyFormat} from "../../../shared/lib/manyFormat.ts";

interface ItemInfoProps {
    className?: string;
    orderItems: UiOrderItem[];
}

export const ItemInfo = (props: ItemInfoProps) => {
    const {t} = useTranslation();
    const {
        className,
        orderItems,
    } = props

    return (
        <div className={classNames(cls.ItemInfo, {}, [className])}>
            {orderItems && orderItems.length > 0 && (
                <div className="order-items">

                    <div className="container text-start mb-3">
                        <p className="fw-semibold fs-4">Позиции заказа</p>
                        <div className="row mb-3">
                            <div className="col-1 order-first text-center bg-light">№</div>
                            <div className="col-4 bg-light">Наименование</div>
                            <div className="col-1 text-center bg-light">Кол-во</div>
                            <div className="col-2 text-center bg-light">Цена, ₽</div>
                            <div className="col order-last text-center bg-light">Cумма</div>
                        </div>
                        {orderItems.map((item, index) => (
                            <div className="row mt-2" key={item.id}>
                                <div className="col-1 order-first text-center border">{index + 1}</div>
                                <div className="col-4 border">{item.product?.productName}</div>
                                <div className="col-1 text-center border">{item.quantity}</div>
                                <div className="col-2 text-center border">{manyFormat(item.pricePerProduct)}</div>
                                <div className="col order-last text-center border">{manyFormat(item.totalPrice)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
