import {IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface ItemProductTypePositionProps {
    productType: string;
}

export const ItemProductTypePosition = ({productType}: ItemProductTypePositionProps) => {

    return (
        <div className="row">
            <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                Тип изделия
            </Typography>
            <Typography className="col-3 p-2 border text-center" variant="body1" gutterBottom>
                {productType}
            </Typography>
            <div className="col-1 p-2">
                <IconButton color="primary">
                    <EditIcon/>
                </IconButton>
            </div>
        </div>
    );
};
