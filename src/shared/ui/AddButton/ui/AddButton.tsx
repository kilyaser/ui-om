import {Tooltip} from "@mui/material";

interface AddButtonProps {
    className?: string;
    onShow: () => void;
    tooltipTitle: string;
    position?: string;
}

export const AddButton = (props: AddButtonProps) => {

    const {
        onShow,
        tooltipTitle,
        position = "top-0 end-0",
    } = props;

    return (
        <div className={`position-absolute ${position}`}>
            <Tooltip title={tooltipTitle}>
                <button
                    className="btn btn-primary rounded-circle"
                    type="submit"
                    onClick={onShow}
                >
                            <span className="h4">
                                +
                            </span>
                </button>
            </Tooltip>
        </div>
    );
};
