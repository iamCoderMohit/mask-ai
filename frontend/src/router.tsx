import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Landing from "./pages/Landing";
import Create from "./pages/Create";
import Examples from "./pages/Examples";
import Pricing from "./pages/Pricing";
import HowItWorks from "./pages/HowItWorks";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "/", element: <Landing />},
            {path: "/create", element: <Create />},
            {path: "/examples", element: <Examples />},
            {path: "/pricing", element: <Pricing />},
            {path: "/how-it-works", element: <HowItWorks />},
        ]
    }
])