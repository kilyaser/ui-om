import {classNames} from "../../../shared/lib/classNames";
import {useCallback, useEffect, useState} from "react";
import {type UiContract, UiContracts} from "../../../clients/generated/commonApi/models";
import {contractsService} from "../../../services";
import {Box, Tooltip} from "@mui/material";
import {ContractModal} from "../../../shared/ui/ContractModal";


interface CounterpartyContractsProps {
    className?: string;
    counterpartyId: string;
}

export const ContractState = {
    ACTIVE: "Активный",
    COMPLETED: "Завершен",
    SUSPENDED: "Приостановлен",
    TERMINATED: "Аннулирован"
}

export const CounterpartyContracts = (props: CounterpartyContractsProps) => {
    const {
        className,
        counterpartyId,
    } = props


    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [contracts, setContracts] = useState<UiContract[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);
    const onShow = useCallback(() => {
        setIsOpen(true);
    }, [])

    useEffect(() => {
        fetchCounterpartyContracts()
    }, [counterpartyId])

    const fetchCounterpartyContracts = async () => {
        setLoading(true);
        try {
            const data: UiContracts = await contractsService.getContractsByCounterpartyId(counterpartyId);
            setContracts(data.contracts || []);
        } catch (error) {
            setError("Ошибка при загрузке Договоров");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={classNames("container-fluid mb-2", {}, [className])}>
            <div className="position-relative">
                {contracts.length > 0 ? (
                        contracts.map((contract) => (
                            (
                                <div key={contract.contractId} className="container-fluid mt-5">
                                    <Box className="d-flex justify-content-center">
                                        <Box
                                            sx={{
                                                width: "19%"
                                            }}
                                        >
                                            <div className="ms-2 mt-2">Номер договора</div>
                                            <Box
                                                component="section"
                                                sx={{
                                                    p: 2,
                                                    bgcolor: '#f3fbfe'
                                                }}
                                            >
                                                <div>{contract.contractNumber ?
                                                    (<div>{contract.contractNumber} от {contract.contractDate}</div>)
                                                    : (<div>
                                                        <span className="text-muted ">Нет данных</span>
                                                    </div>)}</div>
                                            </Box>
                                        </Box>
                                        <Box
                                            className="ms-3"
                                            sx={{
                                                width: "17%"
                                            }}
                                        >
                                            <div className="ms-2 mb-2">Статус</div>
                                            <Box
                                                component="section"
                                                sx={{
                                                    p: 2,
                                                    bgcolor: '#f3fbfe'
                                                }}
                                            >
                                                {contract.status ?
                                                    (<div>{ContractState[contract.status]}</div>)
                                                    : (<div>
                                                        <span className="text-muted ">Нет данных</span>
                                                    </div>)}
                                            </Box>
                                        </Box>
                                        <Box
                                            className="ms-3"
                                            sx={{
                                                width: "19%"
                                            }}
                                        >
                                            <div className="ms-2 mb-2">Дата начала</div>
                                            <Box
                                                component="section"
                                                sx={{
                                                    p: 2,
                                                    bgcolor: '#f3fbfe'
                                                }}
                                            >
                                                {contract.startDate ?
                                                    (<div>{contract.startDate}</div>)
                                                    : (<div>
                                                        <span className="text-muted ">Нет данных</span>
                                                    </div>)}
                                            </Box>
                                        </Box>
                                        <Box
                                            className="ms-3"
                                            sx={{
                                                width: "19%"
                                            }}
                                        >
                                            <div className="ms-2 mb-2">Дата завершения</div>
                                            <Box
                                                component="section"
                                                sx={{
                                                    p: 2,
                                                    bgcolor: '#f3fbfe'
                                                }}
                                            >
                                                {contract.endDate ?
                                                    (<div>{contract.endDate}</div>)
                                                    : (<div>
                                                        <span className="text-muted ">Нет данных</span>
                                                    </div>)}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <hr/>
                                </div>
                            ))))
                    : <div>
                        <span className="text-muted">Контракты не найдены</span>
                    </div>
                }
                <div className="position-absolute top-0 end-0">
                    <Tooltip title={"Создать договор"}>
                        <button
                            className="btn btn-primary rounded-circle"
                            type="submit"
                            onClick={onShow}
                        >
                            <span className="h4">
                                +
                            </span>
                        </button>
                    </Tooltip>
                </div>
            </div>
            <ContractModal
                isOpen={isOpen}
                onClose={onClose}
                onContractCreated={fetchCounterpartyContracts}
                counterpartyId={counterpartyId}
            />
        </div>
    );
};
