import {IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface ItemMaterialPositionProps {
    materialType?: string;
}

export const ItemMaterialPosition = ({materialType}: ItemMaterialPositionProps) => {

    return (
        <div className="row">
            <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                Материал:
            </Typography>
            <Typography className="col-3 p-2 border text-center" variant="body1" gutterBottom>
                {materialType}
            </Typography>
            <div className="col-1 p-2">
                <IconButton color="primary">
                    <EditIcon/>
                </IconButton>
            </div>
        </div>
    );
};
