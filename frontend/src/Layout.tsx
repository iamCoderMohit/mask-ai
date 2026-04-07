import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

const Layout = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <header className="px-10">
                <Navbar />
            </header>

            <div className="bg-white h-[0.5px]"></div>

            <main  className="px-10 ">
                <Outlet />
            </main>

            <footer className="px-10">Footer</footer>
        </div>
    )
}

export default Layout