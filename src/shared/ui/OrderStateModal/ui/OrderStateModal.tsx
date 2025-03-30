import {Modal} from "../../Modul/ui/Modal";
import {OrderStateForm} from "../../OrderStateForm";

interface OrderStateModalProps {
    className?: string;
    orderId: string;
    isOpen: boolean;
    onClose: () => void;
    onStateChange: () => void;
}

export const OrderStateModal = (props: OrderStateModalProps) => {

    const {
        className,
        orderId,
        isOpen,
        onClose,
        onStateChange
    } = props;

    return (
        <Modal
            className={className}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <OrderStateForm
                orderId={orderId}
                onClose={onClose}
                onStateChange={onStateChange}
            />
        </Modal>
    );
};
