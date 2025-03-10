import {classNames} from "../../../shared/lib/classNames";
import {useCallback, useState} from "react";
import {Box, Button} from "@mui/material";
import {CounterpartyModal} from "../../../shared/ui/CounterpartyModal";

interface CounterpartiesPageHeaderProps {
    className?: string;
    onCounterpartyCreated: () => void;
}

export const CounterpartiesPageHeader = (props: CounterpartiesPageHeaderProps) => {
    const {
        className,
        onCounterpartyCreated,
    } = props

    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onShow = useCallback(() => {
        setIsOpen(true);
    }, []);

    return (
        <Box className={classNames("mb-5 mt-2 p-2", {}, [className])}
             sx={{
                 bgcolor: '#f3fbfe'
             }}
        >
            <div className="d-flex justify-content-between p-2">
                <div>
                    <p className="fs-2">Контрагенты</p>
                </div>
                <div>
                    <Button variant="outlined"
                            onClick={onShow}
                    >
                        Создать
                    </Button>
                    <CounterpartyModal
                        className="counterparty"
                        isOpen={isOpen}
                        onClose={onClose}
                        onCounterpartyCreated={onCounterpartyCreated}
                    />
                </div>
            </div>
        </Box>
    );
};
