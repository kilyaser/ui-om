import './OrderProgressBar.scss';
import {OrderState} from "../../type";
import PropTypes from "prop-types";
import {classNames} from "../../../shared/lib/classNames"; // Подключите стили для прогресс-бара

const orderStates = [
    OrderState.NEW,
    OrderState.IN_WORK,
    OrderState.READY,
    OrderState.SHIPPED,
    OrderState.COMPLETED,
    OrderState.CANCELLED,
];

interface OrderProgressBarProps {
    className?: string;
    currentState: string;
}


const OrderProgressBar = (props: OrderProgressBarProps) => {
    const {
        className,
        currentState
    } = props;
    const currentIndex = orderStates.indexOf(currentState);

    return (
        <div className={classNames("", {}, [className])}>
            <div className="order-progress-bar">
                {orderStates.map((state, index) => (
                    <div key={state} className={`progress-step ${index <= currentIndex ? 'active' : ''}`}>
                        <div className="step-label">{state}</div>
                        {index < orderStates.length - 1 &&
                            <div className={`progress-line ${index < currentIndex ? 'completed' : ''}`}></div>}
                    </div>
                ))}
            </div>
        </div>

    );
};

OrderProgressBar.propTypes = {
    currentState: PropTypes.oneOf(Object.values(OrderState)).isRequired,
};

export default OrderProgressBar;