import { lazy } from "react";
import { ROUTE_CONSTANTS } from "../shared/Routes";

const Home = lazy(() => import("../views/Home"))

export const AppRoutes = [
    {
        path: ROUTE_CONSTANTS.HOME,
        element: <Home />,
        title: "Home"
    },
]