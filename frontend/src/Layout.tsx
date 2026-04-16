import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

const Layout = () => {
    return (
        <div className="bg-gray-900 text-white">
            <header className="px-10">
                <Navbar />
            </header>

            <main  className="px-10">
                <Outlet />
            </main>

            <footer className="px-10">
                <h1 className="text-center text-gray-600/50">made by Mohit Joshi</h1>
            </footer>
        </div>
    )
}

export default Layout