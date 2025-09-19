import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Bot } from 'lucide-react'
import React from 'react'

type props = { userName: string, lastMsg: string, selectedUser: string, setSelectedUser: React.Dispatch<React.SetStateAction<string>> }

export default function UserCard({ userName, lastMsg, selectedUser, setSelectedUser }: props) {
    return (
        <div className={cn("flex items-center space-x-3  hover:bg-gray-300 w-full p-2 rounded-md", (selectedUser == userName ? 'bg-gray-400' : ''))}
            onClick={() => setSelectedUser(userName)}>
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=chatbot" alt="Chatbot" />
                <AvatarFallback>
                    <Bot className="h-5 w-5" />
                </AvatarFallback>
            </Avatar>
            <div>
                <h2 className="font-semibold text-base hover:cursor-default">{userName}</h2>
                <p className="text-sm text-gray-600">{lastMsg}</p>
            </div>
        </div>
    )
}
