import {Modal} from "../../Modul/ui/Modal.tsx";
import {CounterpartyForm} from "../../CounterpartyForm";

interface CounterpartyModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onCounterpartyCreated: () => void;
}

export const CounterpartyModal = (props: CounterpartyModalProps) => {

    const {
        className,
        isOpen,
        onClose,
        onCounterpartyCreated,
    } = props;

    return (
        <Modal
            className={className}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <CounterpartyForm
                className={className}
                onClose={onClose}
                onCounterpartyCreated={onCounterpartyCreated}
            />
        </Modal>
    );
};
