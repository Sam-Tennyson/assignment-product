// libs
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { Suspense } from "react";

// components
import AppLayout from "../components/layouts/AppLayout";

// routes constants
import { ROUTE_CONSTANTS } from "../shared/Routes";
import { AppRoutes } from "./AppRoutes";

const DEFAULT_GUEST_ROUTE = ROUTE_CONSTANTS.HOME;

const Fallback = () => (<div className=' text-center'>loading ...</div>);

const GuestRoutes = () => {
    const routes = AppRoutes;
    let defaultGuestRoute = {
        path: "*",
        element: <Navigate to={DEFAULT_GUEST_ROUTE} replace />,
        title: "",
    };
    routes.push(defaultGuestRoute);
    const routing = useRoutes(routes);
    return <Suspense fallback={<Fallback />}>{routing}</Suspense>
};

const RootRouter = () => {
    return (
        <BrowserRouter basename={""}>
            <AppLayout >
                <GuestRoutes />
            </AppLayout>
        </BrowserRouter>
    )
}

export default RootRouter