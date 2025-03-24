import cls from "./ItemPositionInfo.module.scss";
import {classNames} from "../../../shared/lib/classNames";
import {Typography} from "@mui/material";
import {ItemPreparationState} from "../../type";
import {UiOrderItem, UiOrderItemPreparationState} from "../../../clients/generated/commonApi/models";
import {
    ItemMachinePosition,
    ItemMaterialPosition,
    ItemProductTypePosition,
    ItemProgramWrittenPosition
} from "../../../shared/ui/ItemPositionPart";

interface ItemPositionInfoProps {
    className?: string;
    item: UiOrderItem;
    onChangeItem: () => void
}

const ItemStateColor: Record<UiOrderItemPreparationState, string> = {
    NOT_STARTED: cls.yellow,
    IN_PROCESS: cls.blue,
    DONE: cls.green,
}

export const ItemPositionInfo = (props: ItemPositionInfoProps) => {
    const {
        item,
        className,
        onChangeItem
    } = props;

    return (
        <div className={classNames(cls.ItemPositionInfo, {}, [className])}>
            <div className={`mb-5 ${cls.info}`}>
                <div className="row">
                    <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                        Статус готовности:
                    </Typography>
                    <Typography className={`col-3 p-2 border text-center`} variant="body1" gutterBottom>
                        <span className={`${cls.badge} ${ItemStateColor[item.preparationState]}`}>
                            {ItemPreparationState[item.preparationState]}
                        </span>
                    </Typography>
                </div>
                <ItemProgramWrittenPosition isProgramWritten={item.isProgramWritten === true} />
                <ItemMachinePosition
                    item={item}
                    onChangeItem={onChangeItem}
                />
                <ItemMaterialPosition materialType={item.material?.materialType}/>
                <ItemProductTypePosition productType={item.productType}/>
            </div>
        </div>
    );
};