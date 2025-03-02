import {classNames} from "../../../shared/lib/classNames";
import {Box, IconButton, Tooltip} from "@mui/material";
import {UiCounterparty} from "../../../clients/generated/commonApi/models";
import EditIcon from "@mui/icons-material/Edit";

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
        <div className={classNames("container", {}, [className])}>
            <div className="position-relative">
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
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <Tooltip title={"Редактировать информацию"}>
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
