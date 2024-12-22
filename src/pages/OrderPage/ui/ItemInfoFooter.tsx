import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames.ts";
import {UiOrder} from "../../../clients/generated/commonApi/models";
import {manyFormat} from "../../../shared/lib/manyFormat.ts";

interface ItemInfoFooterProps {
    className?: string;
    order: UiOrder
}

export const ItemInfoFooter = (props: ItemInfoFooterProps) => {
    const {t} = useTranslation("order");
    const {
        currentSum,
        vat
    } = props.order

    return (
        <div className={classNames("", {}, [props.className])}>
            <div className="text-start container">
                <div className="row">
                    <div className="col-1 order-first text-center"></div>
                    <div className="col-3"></div>
                    <div className="col-1"></div>
                    <div className="col-3">
                        {t("Сумма без НДС")}
                    </div>
                    <div className="col-2 text-center">
                        {manyFormat(currentSum ? (currentSum - (vat || 0)) : 0)}
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="row">
                    <div className="col-1 order-first text-center"></div>
                    <div className="col-3"></div>
                    <div className="col-1"></div>
                    <div className="col-3">
                        {t("НДС")}
                    </div>
                    <div className="col-2 text-center">
                        {manyFormat(vat)}
                    </div>
                    <div className="col-3"></div>

                </div>
                <div className="row">
                    <div className="col-1 order-first text-center"></div>
                    <div className="col-3"></div>
                    <div className="col-1"></div>
                    <div className="col-3">
                        <strong>{t("Итого с НДС")}</strong>
                    </div>
                    <div className="col-2 text-center">
                        <strong>{manyFormat(currentSum)}</strong>
                    </div>
                    <div className="col-3"></div>
                 </div>
            </div>
        </div>
    );
};
