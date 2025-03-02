import {classNames} from "../../../lib/classNames";
import {Modal} from "../../Modul/ui/Modal";
import {OrderFrom} from "../../OrderForm";
import {UiCounterparty} from "../../../../clients/generated/commonApi/models";

interface OrderModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onOrderCreated: () => void;
    counterparty?: UiCounterparty;
}

export const OrderModal = (props: OrderModalProps) => {
    const {
        className,
        isOpen,
        onClose,
        onOrderCreated,
        counterparty,
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
                counterparty={counterparty}
            />
        </Modal>
    );
};
