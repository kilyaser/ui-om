import {Modal} from "../../Modul/ui/Modal";
import {MachineForm} from "../../MachineForm";

interface MachineModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onMachineCreated: () => void;
}

export const MachineModal = (props: MachineModalProps) => {

    const {
        className,
        isOpen,
        onClose,
        onMachineCreated,
    } = props;

    return (
        <Modal
            className={className}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <MachineForm
                onClose={onClose}
                onMachineCreated={onMachineCreated}
            />
        </Modal>
    );
};
