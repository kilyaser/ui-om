import {classNames} from "../../../shared/lib/classNames";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {UiCounterparty} from "../../../clients/generated/commonApi/models";
import counterpartyService from "../../../services/counterparty-service/CounterpartyService";
import {Box} from "@mui/material";


interface CounterpartyPageProps {
    className?: string;

}

export const CounterpartyPage = (props: CounterpartyPageProps) => {
    const {
        className,

    } = props;

    const {counterpartyId = ""} = useParams();

    const [counterparty, setCounterparty] = useState<UiCounterparty | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchCounterparty = useCallback(async () => {
        try {
            const data: UiCounterparty = await counterpartyService.getCounterpartyById(counterpartyId);
            setCounterparty(data);
        } catch (error) {
            setError(`Counterparty by id ${counterpartyId} not found`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [counterpartyId]);

    useEffect(() => {
        const loadedCounterparty = async () => {
            await fetchCounterparty();
        };
        loadedCounterparty().catch(error => {
            console.error(error);
        })
    })

    const handleChangeCounterparty = async () => {
        await fetchCounterparty();
    }

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={classNames("", {}, [className])}>
            {counterparty ? (
                <div className="container-fluid">
                    <p className={"fw-bold"}>{counterparty.name}</p>
                    <hr/>
                    <Box className="d-flex justify-content-center">
                        <Box
                            sx={{
                                width: "25%"
                            }}
                        >
                            <div className="ms-2 mt-2">Телефон</div>
                            <Box
                                component="section"
                                sx={{
                                    p: 2,
                                    bgcolor: '#f3fbfe'
                                }}
                            >
                                <div>{counterparty.phone ?
                                    (<div>{counterparty.phone}</div>)
                                    : (<div>
                                        <span className="text-muted ">Нет данных</span>
                                    </div>)}</div>
                            </Box>
                        </Box>
                        <Box
                            className="ms-3"
                            sx={{
                                width: "25%"
                            }}
                        >
                            <div className="ms-2 mb-2">Почта</div>
                            <Box
                                component="section"
                                sx={{
                                     p: 2,
                                    bgcolor: '#f3fbfe'
                                }}
                            >
                                {counterparty.email ?
                                    (<div>{counterparty.email}</div>)
                                    : (<div>
                                        <span className="text-muted ">Нет данных</span>
                                    </div>)}
                            </Box>
                        </Box>
                        <Box
                            className="ms-3"
                            sx={{
                                width: "25%"
                            }}
                        >
                            <div className="ms-2 mb-2">ИНН</div>
                            <Box
                                component="section"
                                sx={{
                                    p: 2,
                                    bgcolor: '#f3fbfe'
                                }}
                            >
                                {counterparty.inn ?
                                    (<div>{counterparty.inn}</div>)
                                    : (<div>
                                        <span className="text-muted ">Нет данных</span>
                                    </div>)}
                            </Box>
                        </Box>
                    </Box>
                </div>

            ) : (<div>
                <span className="text-muted">Контрагент не найден</span>
            </div>)}
        </div>
    );
};

export default CounterpartyPage;