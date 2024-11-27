import {Component, Suspense} from "react";
import {PageLoader} from "../../../../shared/ui/PageLoader";
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "../../../../shared/config/routeConfig/routeConfig";

class AppRouter extends Component {
    render() {
        return (
            <Suspense fallback={<PageLoader/>}>
                <Routes>
                    {Object.values(routeConfig).map(({element, path}) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <div className="page-wrapper">
                                    {element}
                                </div>
                            }>
                        </Route>
                    ))}
                </Routes>
            </Suspense>
        );
    }
}

export default AppRouter;