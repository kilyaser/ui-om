
import {Alert, Snackbar} from "@mui/material";

interface CustomSnackbarProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
    onClose: () => void;
}

export const CustomSnackbar = (props: CustomSnackbarProps) => {

    const {
        open,
        message,
        severity,
        onClose,
    } = props;

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
