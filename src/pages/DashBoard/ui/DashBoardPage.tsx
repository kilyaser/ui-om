
import {useTranslation} from "react-i18next";

export const DashBoardPage = () => {
    const {t} = useTranslation();

    return (
        <div>
            {t("Дашборд")}
        </div>
    );
};
export default DashBoardPage;
