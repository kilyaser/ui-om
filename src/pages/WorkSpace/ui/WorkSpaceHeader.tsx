import {classNames} from "../../../shared/lib/classNames.ts";
import {Button} from "@mui/material";
import {useCallback, useState} from "react";
import {OrderModal} from "../../../shared/ui/OrderModal";

interface WorkSpaceHeaderProps {
    className?: string;
    onOrderCreated: () => void;
}

export const WorkSpaceHeader = ({className, onOrderCreated}: WorkSpaceHeaderProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onShow = useCallback(() => {
        setIsOpen(true);
    }, [])
    return (
        <div className={classNames("mb-5 mt-2 bg-light p-2", {}, [className])}>
            <div className="d-flex justify-content-between p-2">
                <div>
                    <p className="fs-2">Заказы</p>
                </div>
                <div>
                    <Button variant="outlined"
                    onClick={onShow}
                    >
                        Создать
                    </Button>
                    <OrderModal
                        isOpen={isOpen}
                        onClose={onClose}
                        onOrderCreated={onOrderCreated}
                    />
                </div>
            </div>
        </div>
    );
};
