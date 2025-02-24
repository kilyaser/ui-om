import { classNames } from "../../../shared/lib/classNames";


interface CounterpartyPageProps {
    className?: string;

}

export const CounterpartyPage = (props: CounterpartyPageProps) => {
    const {
        className,

    } = props;

    return (
        <div className={classNames("", {}, [className])}>
            Контрагент
        </div>
    );
};

export default CounterpartyPage;