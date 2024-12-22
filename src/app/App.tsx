import {Suspense} from "react";
import {classNames} from "../shared/lib/classNames";
import {Navbar} from "../widgets/Navbar";
import {Sidebar} from "../widgets/Sidebar";
import {AppRouter} from "./providers/router";
import {ErrorBoundary} from "react-error-boundary";
import {Loader} from "../shared/ui/Loader";

function App() {
    return (
        <div className={classNames("app", {}, [])}>
            <ErrorBoundary fallback={<div>Error</div>}>
                <Suspense fallback={<Loader/>}>
                    <Navbar/>
                    <div className={"content-page"}>
                        <Sidebar/>
                        <AppRouter/>
                    </div>
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

export default App;
