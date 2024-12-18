import {classNames} from "../../../shared/lib/classNames";

// import cls from "./OrderPage.module.scss";
// import {useTranslation} from "react-i18next";

interface OrderPageProps {
    className?: string;
}

export const OrderPage = ({className}: OrderPageProps) => {
    // const {t} = useTranslation();

    return (
        <div className={classNames("", {}, [className])}>
            Order
        </div>
    );
};

export default OrderPage;
