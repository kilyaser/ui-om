import type {UiOrderShort} from "../../../../clients/generated/commonApi/models";
import {classNames} from "../../../lib/classNames.ts";

interface TableProps {
    className?: string;
    columns: Array<string>;
    ordersShort: UiOrderShort[];
}

export const Table = (props: TableProps) => {

    const {
        className,
        columns,
        ordersShort,
    } = props;

    return (
        <table className={classNames("table", {}, [className])}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {ordersShort.length > 0 ? (
                ordersShort.map((order, index) => (
                    <tr key={order.orderId}>
                        <th scope="row">{index + 1}</th>
                        <td>{order.orderNumber}</td>
                        <td>{order.counterpartyName}</td>
                        <td>{order.currentSum}</td>
                        <td>{order.orderState}</td>
                        <td>{order.isGovernmentOrder ? 'Да' : 'Нет'}</td>
                        <td>{order.completionDate}</td>
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
