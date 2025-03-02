import {Modal} from "../../Modul/ui/Modal";
import {ContractForm} from "../../ContractForm";


interface ContractModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onContractCreated: () => void;
    counterpartyId: string
}

export const ContractModal = (props: ContractModalProps) => {
    const {
        className,
        isOpen,
        onClose,
        onContractCreated,
        counterpartyId,
    } = props;
    return (
        <Modal
            className={className}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <ContractForm
                onClose={onClose}
                onContractCreated={onContractCreated}
                counterpartyId={counterpartyId}
            />
        </Modal>
    );
};
