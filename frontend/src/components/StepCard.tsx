interface StepCardInput {
    title: string
}

export default function StepCard({title}: StepCardInput) {
    return <div>
        <h1>{title}</h1>
    </div>
}