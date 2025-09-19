import React from 'react';
import ChatInterface from './ChatInterface';
import Chats from './Chats';

export default function ChatIndex() {
    const [selectedUser, setSelectedUser] = React.useState("All");
    return (
        <div className="min-w-full min-h-full p-4 flex">
            <div className="flex flex-1 min-w-full min-h-full bg-white rounded-md shadow-sm">
                <div className='w-3/12 h-full rounded-l-md' >
                    <Chats selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                </div>
                <div className='w-9/12 rounded-r-md' >
                    <ChatInterface selectedUser={selectedUser} />
                </div>
            </div>
        </div>
    )

    // return (
    //     <div>
    //         <span>
    //             Message
    //         </span>
    //         <div className="flex gap-2">
    //             <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
    //             <Button onClick={() => sendMessage(message)}>Send Message</Button>
    //         </div>
    //     </div>
    // )
}
