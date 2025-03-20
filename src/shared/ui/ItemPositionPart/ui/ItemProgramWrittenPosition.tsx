import {IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface ItemProgramWrittenPositionProps {
    isProgramWritten: boolean;
}

export const ItemProgramWrittenPosition = ({isProgramWritten}: ItemProgramWrittenPositionProps) => {

    return (
        <div className="row">
            <Typography className="col-3 p-2 border bg-light" variant="body1" gutterBottom>
                Наличие программа ЧПУ:
            </Typography>
            <Typography className="col-3 p-2 border text-center" variant="body1" gutterBottom>
                {isProgramWritten ? "Да" : "Нет"}
            </Typography>
            <div className="col-1 p-2">
                <IconButton color="primary">
                    <EditIcon/>
                </IconButton>
            </div>
        </div>
    );
};
