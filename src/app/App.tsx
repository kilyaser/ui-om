import {useTranslation} from "react-i18next";
import {Suspense} from "react";
import {classNames} from "../shared/lib/classNames";
import {LangSwitcher} from "../shared/ui/LangSwitcher";
import {Navbar} from "../widgets/Navbar";

function App() {
    const {t} = useTranslation();

  return (
      <div className={classNames("app", {}, [])}>
          <Suspense fallback="">
              <Navbar/>
              {t("Начало")}
              <LangSwitcher/>
          </Suspense>
      </div>
  )
}

export default App
