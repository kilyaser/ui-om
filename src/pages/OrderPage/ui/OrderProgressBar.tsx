import './OrderProgressBar.scss';
import {OrderState} from "../../type";
import PropTypes from "prop-types";
import {Box, Step, StepLabel, Stepper} from "@mui/material"; // Подключите стили для прогресс-бара

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
    const {className, currentState} = props;
    const currentIndex = orderStates.indexOf(currentState);
    const isCancelled = currentState == OrderState.CANCELLED;

    return (
        <Box sx={{width: '100%'}} className={`${className} d-flex`}>
            <Stepper activeStep={isCancelled ? -1 : currentIndex} alternativeLabel className={"flex-grow-1"}>
                {orderStates.filter((state) => state !== OrderState.CANCELLED).map((state) => (
                    <Step key={state}>
                        <StepLabel>{state}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Stepper activeStep={isCancelled ? currentIndex : -1} alternativeLabel>
                <Step
                    sx={{
                        '& .Mui-completed': {
                            color: 'red',
                        }
                    }}

                >
                    <StepLabel
                        sx={{
                            color: isCancelled ? 'red' : 'lightgray',
                            '& .MuiStepLabel-label': {
                                color: isCancelled ? 'red' : 'lightgray',
                            }
                        }}
                    >
                        {OrderState.CANCELLED}
                    </StepLabel>
                </Step>
            </Stepper>
        </Box>
    );
};

OrderProgressBar.propTypes = {
    currentState: PropTypes.oneOf(Object.values(OrderState)).isRequired,
};

export default OrderProgressBar;