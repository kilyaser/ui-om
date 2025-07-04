
import {classNames} from "../../../../shared/lib/classNames";
import {Modal} from "../../../../shared/ui/Modul/ui/Modal";
import {LoginForm} from "../LoginForm/LoginForm";

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({className, isOpen, onClose}: LoginModalProps) => {

    return (
        <Modal
            className={classNames("", {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <LoginForm onSuccess={onClose}/>
        </Modal>
    );
};
