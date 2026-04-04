import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Landing from "./pages/Landing";
import Create from "./pages/Create";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "/", element: <Landing />},
            {path: "/create", element: <Create />}
        ]
    }
])