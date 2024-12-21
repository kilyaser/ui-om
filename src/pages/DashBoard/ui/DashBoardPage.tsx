
import {useTranslation} from "react-i18next";

export const DashBoardPage = () => {
    const {t} = useTranslation();

    return (
        <div>
            <p className="fs-1 fw-semibold">{t("В разработке")}</p>

        </div>
    );
};
export default DashBoardPage;
