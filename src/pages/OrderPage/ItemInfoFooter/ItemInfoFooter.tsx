import {classNames} from "../../../shared/lib/classNames";
import {UiOrder} from "../../../clients/generated/commonApi/models";
import {manyFormat} from "../../../shared/lib/manyFormat";

interface ItemInfoFooterProps {
    className?: string;
    order: UiOrder
}

export const ItemInfoFooter = (props: ItemInfoFooterProps) => {
    const {
        currentSum,
        vat
    } = props.order

    return (
        <div className={classNames("", {}, [props.className])}>
            <div className="text-end mt-2">
                <div className="row">
                    <div className="col-8"></div>
                    <div className="col-2 p-1 font-monospace fs-6">
                        Итого:
                    </div>
                    <div className="col-1 p-1 text-center font-monospace fs-6">
                        {manyFormat(currentSum ? (currentSum - (vat || 0)) : 0)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-8"></div>
                    <div className="col-2 p-1 font-monospace fs-6">
                        НДС 20%:
                    </div>
                    <div className="col-1 p-1 text-center font-monospace fs-6">
                        {manyFormat(vat)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-8"></div>
                    <div className="col-2 p-1 font-monospace fs-6">
                        <strong>Всего, вкл. НДС 20%:</strong>
                    </div>
                    <div className="col-1 p-1 text-center font-monospace fs-6">
                        <strong>{manyFormat(currentSum)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};
