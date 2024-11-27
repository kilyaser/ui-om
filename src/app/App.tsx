import {useTranslation} from "react-i18next";
import {Suspense} from "react";
import {classNames} from "../shared/lib/classNames";
import {Navbar} from "../widgets/Navbar";
import {Sidebar} from "../widgets/Sidebar";
import {AppRouter} from "./providers/router";


function App() {
    const {t} = useTranslation();

  return (
      <div className={classNames("app", {}, [])}>
          <Suspense fallback="">
              <Navbar/>
              <div className={"content-page"}>
                  <Sidebar/>
                  <AppRouter/>
              </div>
              {t("Начало")}
          </Suspense>
      </div>
  )
}

export default App
