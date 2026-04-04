export default function Navbar() {
    return <div className="flex justify-between py-4">
        <h1>Mask</h1>

        <div className="flex gap-5">
            <button>Login</button>
            <button>Signup</button>
        </div>
    </div>
}