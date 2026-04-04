import axios from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function Create() {
    const location = useLocation()
    const data = location.state

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    async function init() {
        const res = await axios.post(`${BACKEND_URL}/template`, {prompt: data.trim()})

        const {prompts, uiPromts} = res.data

        const stepsRes = await axios.post(`${BACKEND_URL}/chat`, {messages: [...prompts, data]})
    }

    useEffect(() => {
        init()
    }, [])

    return <div className="py-2">
        <h1 className="font-md text-lg">{data}</h1>
    </div>
}