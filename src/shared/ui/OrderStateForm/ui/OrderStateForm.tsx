import {classNames} from "../../../lib/classNames";
import {useCallback, useEffect, useState} from "react";
import {orderService} from "../../../../services";
import {
    UiOrderAvailableStateActionAvailableStateItem
} from "../../../../clients/generated/commonApi/models";
import {ActionOption} from "../../../../pages/OrderPage/ActionOption/ActionOption";
import {ErrorDisplay} from "../../ErrorDisplay";

interface OrderStateFormProps {
    className?: string;
    onClose: () => void;
    onStateChange: () => void;
    orderId: string;
}

export const orderStateType: Record<string, UiOrderAvailableStateActionAvailableStateItem> = {
    "Новый": UiOrderAvailableStateActionAvailableStateItem.NEW,
    "В работе": UiOrderAvailableStateActionAvailableStateItem.IN_WORK,
    "Отменен": UiOrderAvailableStateActionAvailableStateItem.CANCELLED,
    "Завершен": UiOrderAvailableStateActionAvailableStateItem.COMPLETED,
    "Отгружен": UiOrderAvailableStateActionAvailableStateItem.SHIPPED
};


export const OrderStateForm = (props: OrderStateFormProps) => {
    const {
        className,
        onClose,
        onStateChange,
        orderId,
    } = props;

    const [error, setError] = useState<Error | null>(null);
    const [isChanged, setIsChanged] = useState(false);
    const [stateOptions, setSateOptions] = useState<UiOrderAvailableStateActionAvailableStateItem[]>([])
    const [selectedState, setSelectedState] = useState<UiOrderAvailableStateActionAvailableStateItem | null>(null);
    const [stateKey, setStateKey] = useState<string[]>([]);

    const fetchAvailableOrderState = useCallback(async () => {
        try {
            const data = await orderService.getAvailableOrderStates(orderId);
            setSateOptions(data.availableState);
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            }
        }
    }, [orderId]);

    useEffect(() => {
        fetchAvailableOrderState();
    }, [fetchAvailableOrderState]);

    useEffect(() => {
        const keys = Object.keys(orderStateType).filter(key =>
            stateOptions.includes(orderStateType[key])
        );
        setStateKey(keys);
    }, [stateOptions]);

    const onOrderStateSelected = (state: string) => {
        setSelectedState(orderStateType[state]);
        setIsChanged(true);
    }

    const handleStateChange = async () => {
        if (!selectedState) {
            return;
        }
        try {
            await orderService.changeState(orderId, selectedState);
            onStateChange();
            onClose()
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            }
        }
    }

    if (error) {
        return <ErrorDisplay error={error}/>
    }

    return (
        <div className={classNames("", {}, [className])}>
            <div>
                <ActionOption
                    actions={stateKey}
                    label={"Доступные статусы заказа"}
                    onValueChange={onOrderStateSelected}
                />
            </div>
            <div className="modal-footer">
                <button type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={onClose}
                >
                    Отмена
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleStateChange}
                    disabled={!isChanged}
                >
                    Изменить статус
                </button>
            </div>
        </div>
    );
};
