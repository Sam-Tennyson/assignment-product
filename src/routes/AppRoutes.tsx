import { lazy } from "react";
import { ROUTE_CONSTANTS } from "../shared/Routes";

const Home = lazy(() => import("../views/Home"))
const ProductDetails = lazy(() => import("../views/ProductDetails"))

export const AppRoutes = [
    {
        path: ROUTE_CONSTANTS.HOME,
        element: <Home />,
        title: "Home"
    },
    {
        path: ROUTE_CONSTANTS.PRODUCT_DETAILS,
        element: <ProductDetails />,
        title: "ProductDetails"
    },
]