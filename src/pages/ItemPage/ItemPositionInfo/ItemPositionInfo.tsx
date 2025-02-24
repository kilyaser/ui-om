import cls from "./ItemPositionInfo.module.scss";
import {classNames} from "../../../shared/lib/classNames";
import {IconButton, Typography} from "@mui/material";
import {ItemPreparationState} from "../../type";
import {UiOrderItem, UiOrderItemPreparationState} from "../../../clients/generated/commonApi/models";
import EditIcon from '@mui/icons-material/Edit';

interface ItemPositionInfoProps {
    className?: string;
    item: UiOrderItem;
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
    } = props;

    return (
        <div className={classNames(cls.ItemPositionInfo, {}, [className])}>
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
                    <div className="col-1 p-2">
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className="row">
                    <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                        Станок ЧПУ:
                    </Typography>
                    <Typography className="col-2 p-2 border text-center" variant="body1" gutterBottom>
                        Список опций станков
                    {/*    item.machines*/}
                    </Typography>
                    <div className="col-1 p-2">
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className="row">
                    <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                        Материал:
                    </Typography>
                    <Typography className="col-2 p-2 border text-center" variant="body1" gutterBottom>
                        {item.material?.materialType}
                    </Typography>
                    <div className="col-1 p-2">
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className="row">
                    <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                        Тип изделия
                    </Typography>
                    <Typography className="col-2 p-2 border text-center" variant="body1" gutterBottom>
                        {item.productType}
                    </Typography>
                    <div className="col-1 p-2">
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
};