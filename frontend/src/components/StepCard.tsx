interface StepCardInput {
    title: string
}

export default function StepCard({title}: StepCardInput) {
    return <div className="bg-gray-500/20 p-1 rounded-md hover:bg-gray-500/40">
        <h1>{title}</h1>
    </div>
}