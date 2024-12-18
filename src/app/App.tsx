import {useTranslation} from "react-i18next";
import {Suspense} from "react";
import {classNames} from "../shared/lib/classNames";
import {Navbar} from "../widgets/Navbar";
import {Sidebar} from "../widgets/Sidebar";
import {AppRouter} from "./providers/router";
import {ErrorBoundary} from "react-error-boundary";
import {Loader} from "../shared/ui/Loader";

function App() {
    const {t} = useTranslation();
    return (
        <div className={classNames("app", {}, [])}>
            <ErrorBoundary fallback={<div>Error</div>}>
                <Suspense fallback={<Loader/>}>
                    <Navbar/>
                    <div className={"content-page"}>
                        <Sidebar/>
                        <AppRouter/>
                    </div>
                    {t("Начало")}
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

export default App;
