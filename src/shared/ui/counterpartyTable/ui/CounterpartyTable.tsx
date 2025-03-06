import {PageRequest, PageUiCounterparty, type UiCounterparty} from "../../../../clients/generated/commonApi/models";
import {useEffect, useMemo, useState} from "react";
import counterpartyService from "../../../../services/counterparty-service/CounterpartyService";
import {Pagination} from "../../Pagination";
import {Table} from "../../Table";
import {RoutePath} from "../../../config/routeConfig/routeConfig";
import {Link} from "react-router-dom";
import {CounterpartiesPageHeader} from "../../../../pages/CounterpartiesPage/ui/CounterpartiesPageHeader";

export const CounterpartyTable = () => {
    const [counterparties, setCounterparties] = useState<UiCounterparty[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0); // Текущая страница
    const [totalPages, setTotalPages] = useState<number>(0); // Общее количество страниц
    const pageRequest: PageRequest = useMemo(() => ({
        page: currentPage,
        size: 20,
    }), [currentPage]);

    const columns = [
        "№",
        "Наименование контрагента",
        "ИНН",
        "e-mail",
        "Телефон"
    ]

    useEffect(() => {
        refreshCounterparties();
    }, [pageRequest]);

    const refreshCounterparties = async () => {
        setLoading(true); // Устанавливаем состояние загрузки
        try {
            const data: PageUiCounterparty = await counterpartyService.getCounterparties(pageRequest);
            setCounterparties(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            setError('Ошибка при загрузке заказов:');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={"container-fluid"}>
            <CounterpartiesPageHeader
                onCounterpartyCreated={refreshCounterparties}
            />
            <Table
                className={`table rounded-3`}
                columns={columns}
                data={counterparties}
                renderRow={(counterparty, index) => (
                    <>
                        <th scope="row">
                            <Link to={RoutePath.counterparty.replace(":counterpartyId", `${counterparty.id}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {index + 1 + currentPage * 20}
                            </Link>
                        </th>
                        <td>
                            <Link to={RoutePath.counterparty.replace(":counterpartyId", `${counterparty.id}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {counterparty.name}
                            </Link>
                        </td>
                        <td>
                            <Link to={RoutePath.counterparty.replace(":counterpartyId", `${counterparty.id}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {counterparty.inn}
                            </Link>
                        </td>
                        <td>
                            <Link to={RoutePath.counterparty.replace(":counterpartyId", `${counterparty.id}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {counterparty.email}
                            </Link>
                        </td>
                        <td>
                            <Link to={RoutePath.counterparty.replace(":counterpartyId", `${counterparty.id}`)}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                {counterparty.phone}
                            </Link>
                        </td>
                    </>
                )}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};
