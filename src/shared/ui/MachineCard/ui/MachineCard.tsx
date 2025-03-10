import cls from "./MachineCard.module.scss";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {RoutePath} from "../../../config/routeConfig/routeConfig";
import {UiMachine, UiMachineMachineType} from "../../../../clients/generated/commonApi/models";

interface MachineCardProps {
    className?: string;
    machine: UiMachine;
}

export const machineType: Record<UiMachineMachineType, string> = {
    THREE_AXIS: "Трех осевой",
    FIVE_AXIS: "Пяти осевой"
};

export const MachineCard = (props: MachineCardProps) => {
    const {className, machine} = props;

    const cardBackgroundColor = machine.isOccupied ? "#ffebee" : "#ecfbf3";
    const cardBorderColor = machine.isOccupied ? "#b71c1c" : "#0a6236";


    return (
        <Box key={machine.id} className={`${cls.card} ${className} ms-4`}>
            <Card sx={{minWidth: 275, backgroundColor: cardBackgroundColor, border: `1px solid ${cardBorderColor}`}}>
                <CardContent>
                    <Typography
                        className="fs-5"
                        gutterBottom
                        sx={{color: cardBorderColor, fontSize: 14}}
                    >
                        {machine.name}
                    </Typography>

                    <Typography sx={{color: cardBorderColor, mb: 1.5}}>
                        Тип: {machineType[machine.machineType]}
                    </Typography>
                    <div className="row">
                        <div className="col-7">
                            <Typography sx={{color: cardBorderColor, mb: 1.5}}>
                                Заказ в работе:
                            </Typography>
                        </div>
                        <div className="col-5">
                            <Typography sx={{color: cardBorderColor, mb: 1.5}}>
                                {machine.isOccupied
                                    ? (<span>{machine.order?.orderNumber}</span>)
                                    : (<span>свободен</span>)}
                            </Typography>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <Typography sx={{color: cardBorderColor, mb: 1.5}}>
                                Позиция в работе
                            </Typography>
                        </div>
                        <div className="col-5">
                            <Typography sx={{color: cardBorderColor, mb: 1.5}}>
                                {machine.isOccupied
                                    ? (<span>{machine.orderItem?.product?.productName}</span>)
                                    : (<span>свободен</span>)}
                            </Typography>
                        </div>
                    </div>
                </CardContent>
                <CardActions>
                    {machine.isOccupied ? (
                        <Link
                            to={RoutePath.order.replace(":orderId", `${machine.order?.orderId}`)}
                            style={{textDecoration: 'none', color: 'inherit'}}>
                            <Button size="small">
                                Перейти к заказу
                            </Button>
                        </Link>
                    ) : (
                            <Button size="small" disabled>
                                Перейти к заказу
                            </Button>

                    )}
                </CardActions>
            </Card>
        </Box>
    );
};
