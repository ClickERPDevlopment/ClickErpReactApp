import { useNotifications } from '@/utility/NotificationProvider';
import Chat from './chat'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function ChatIndex() {
    const { chatMessages, sendChatMessage: sendMessage } = useNotifications();
    const [message, setMessage] = React.useState("");

    return (
        <div>
            <span>
                Message
            </span>
            <div className="flex gap-2">
                <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button onClick={() => sendMessage(message)}>Send Message</Button>
            </div>
            <Chat chatMessages={chatMessages} />
        </div>
    )
}
