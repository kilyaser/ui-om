import {classNames} from "../../../shared/lib/classNames";

interface CounterpartiesPageProps {
    className?: string;
}

export const CounterpartiesPage = ({className}: CounterpartiesPageProps) => {

    return (
        <div className={classNames("", {}, [className])}>
            В разработке.
        </div>
    );
};

export default CounterpartiesPage;
