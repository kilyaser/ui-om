import {useTranslation} from "react-i18next";

const WorkSpacePage  = () => {
    const {t} = useTranslation();

    return (
        <div>
            {t("Заказы")}
        </div>
    )
}
export default WorkSpacePage;