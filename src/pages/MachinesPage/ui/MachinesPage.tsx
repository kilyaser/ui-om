import machineService from "../../../services/machines-service/MachinesService";
import {UiMachine} from "../../../clients/generated/commonApi/models";
import {useCallback, useEffect, useState} from "react";
import {ErrorDisplay} from "../../../shared/ui/ErrorDisplay";
import {MachineModal} from "../../../shared/ui/MachineModal";
import {AddButton} from "../../../shared/ui/AddButton";
import {MachineCard} from "../../../shared/ui/MachineCard";

interface MachinesPageProps {
    className?: string;
}

export const MachinesPage = ({className}: MachinesPageProps) => {

    const [machines, setMachines] = useState<UiMachine[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onShow = useCallback(() => {
        setIsOpen(true);
    }, []);

    const fetchMachines = async () => {
        try {
            const data = await machineService.findAllMachines();
            setMachines(data.machines || []);
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            }

        }
    }

    useEffect(() => {
        fetchMachines()
    }, [])


    if (error) {
        return <ErrorDisplay error={error}/>
    }

    return (
        <div className={className}>
            <div>
                {machines.length > 0 ? (
                    <div className="d-flex">
                        {machines.map(machine => (
                            <MachineCard
                                machine={machine}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No machines found.</p>
                )}
            </div>
            <div className="mt-4 position-relative">
                <AddButton
                    onShow={onShow}
                    tooltipTitle={"Добавить станок"}
                    position={"top-100 start-50 translate-middle"}
                />
            </div>
            <MachineModal
                isOpen={isOpen}
                onClose={onClose}
                onMachineCreated={fetchMachines}
            />
        </div>
    );
};

export default MachinesPage;
