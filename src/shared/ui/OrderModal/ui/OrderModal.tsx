import {classNames} from "../../../lib/classNames";
import {Modal} from "../../Modul/ui/Modal";
import {OrderFrom} from "../../OrderForm";

interface OrderModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onOrderCreated: () => void;
}

export const OrderModal = (props: OrderModalProps) => {
    const {
        className,
        isOpen,
        onClose,
        onOrderCreated,
    } = props;
    return (
        <Modal
            className={classNames("", {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <OrderFrom
                onClose={onClose}
                onOrderCreated={onOrderCreated}
            />
        </Modal>
    );
};
