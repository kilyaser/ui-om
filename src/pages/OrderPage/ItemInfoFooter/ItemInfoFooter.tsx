import {useTranslation} from "react-i18next";
import {classNames} from "../../../shared/lib/classNames";
import {UiOrder} from "../../../clients/generated/commonApi/models";
import {manyFormat} from "../../../shared/lib/manyFormat";

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
            <div className="text-start mt-4">
                <div className="row">
                    <div className="col-2 p-1 font-monospace fs-5 border-bottom">
                        {t("Сумма без НДС")}
                    </div>
                    <div className="col-1 p-1 text-center font-monospace fs-5 border-bottom">
                        {manyFormat(currentSum ? (currentSum - (vat || 0)) : 0)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 p-1 font-monospace fs-5 border-bottom">
                        {t("НДС")}
                    </div>
                    <div className="col-1 p-1 text-center font-monospace fs-5 border-bottom">
                        {manyFormat(vat)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 p-1 font-monospace fs-5 border-bottom">
                        <strong>{t("Итого с НДС")}</strong>
                    </div>
                    <div className="col-1 p-1 text-center font-monospace fs-5 border-bottom">
                        <strong>{manyFormat(currentSum)}</strong>
                    </div>
                 </div>
            </div>
        </div>
    );
};
