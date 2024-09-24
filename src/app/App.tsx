import {useTranslation} from "react-i18next";
import {Suspense} from "react";
import {classNames} from "../shared/lib/classNames.ts";

const Component = () => {
    const {t, i18n} = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === "ru" ? "ru" : "en");
    }

    return (
        <div>
            <button onClick={toggle}>{t("Перевод")}</button>
        </div>
    );
};

function App() {
    const {t} = useTranslation();

  return (
      <div className={classNames("app", {}, [])}>
          <Suspense fallback="">
              {t("Начало")}
              <Component/>
          </Suspense>
      </div>
  )
}

export default App
