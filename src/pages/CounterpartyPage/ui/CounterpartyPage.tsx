import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {UiCounterparty} from "../../../clients/generated/commonApi/models";
import counterpartyService from "../../../services/counterparty-service/CounterpartyService";
import {Box} from "@mui/material";
import {CounterpartyInfo} from "./CounterpartyInfo.tsx";
import {CounterpartyContracts} from "./CounterpartyContracts.tsx";


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
        <div>
            <p className={"fw-bold"}>{counterparty?.name}</p>
            <hr/>
            <div>
                <Box
                    component="section"
                    sx={{
                        p: 2,
                        // bgcolor: '#f3fbfe'
                    }}
                >
                    <CounterpartyInfo
                        className={className}
                        counterparty={counterparty}/>
                </Box>

                <p className={"fw-bold"}>Заказы</p>
                <hr/>
                <CounterpartyContracts
                    counterpartyId={counterpartyId}
                />
            </div>
        </div>

    );
};

export default CounterpartyPage;