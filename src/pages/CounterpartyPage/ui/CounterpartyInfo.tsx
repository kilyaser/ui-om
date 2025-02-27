import {classNames} from "../../../shared/lib/classNames.ts";
import {Box} from "@mui/material";
import {UiCounterparty} from "../../../clients/generated/commonApi/models";

interface CounterpartyInfoProps {
    className?: string;
    counterparty: UiCounterparty | null;
}

export const CounterpartyInfo = (props: CounterpartyInfoProps) => {
    const {
        className,
        counterparty
    } = props;

    return (
        <div className={classNames("", {}, [className])}>
            {counterparty ? (
                <div className="container-fluid">
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
