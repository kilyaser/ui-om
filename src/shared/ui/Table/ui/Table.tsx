
import {classNames} from "../../../lib/classNames";

interface TableProps<T> {
    className?: string;
    columns: Array<string>;
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
}

export const Table = <T,>(props: TableProps<T>) => {

    const {
        className,
        columns,
        data,
        renderRow,
    } = props;

    return (
        <table className={classNames("", {}, [className])}>
            <thead className="table-light">
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={index}>
                            {renderRow(item, index)}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length}>Нет данных для отображения</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
//TODO: Перевести наименование колонок и сделать маппинг статусов заказа.