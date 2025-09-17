
export default function Chat({ chatMessages }: { chatMessages: string[] }) {
    return (
        <div>
            <span>
                Chat Messages
            </span>
            <div>
                {chatMessages.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
    )
}
