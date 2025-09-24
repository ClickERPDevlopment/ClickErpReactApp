import React from "react";
import { Input } from "@/components/ui/input";
import UserCard from "./UserCard";
import { useNotifications } from "@/utility/NotificationProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConnectedUser } from "../ActiveUser/ConnectedUser";

export default function Chats({ selectedUser, setSelectedUser }: { selectedUser: string, setSelectedUser: React.Dispatch<React.SetStateAction<string>> }) {
    const { reactUser } = useNotifications();
    const [users, setUsers] = React.useState<ConnectedUser[]>([])
    React.useEffect(() => {
        setUsers(reactUser)
    }, [reactUser])

    //filter user by inputed value
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const users = reactUser?.filter(user => user.FullName.toLowerCase().includes(e.target.value.toLowerCase()))
        setUsers(users)
    }

    return (
        <div className="flex flex-col h-full bg-gray-100 border rounded-l-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 rounded-tl-md border-b border-b-gray-300 w-full">
                <div className="flex flex-col items-start space-y-2 w-full">
                    <h2 className="font-semibold text-lg">Chats</h2>
                    <Input placeholder="Search" className="w-full" onChange={handleInput}></Input>
                </div>
            </div>

            {/* Messages Area - Fixed height with proper scrolling */}
            <div className="h-[calc(100vh-210px)] px-1">
                <ScrollArea className="h-full w-full">
                    <div className="flex flex-col flex-1 items-center rounded-bl-md w-full gap-1">
                        <UserCard userName="All" lastMsg="" selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                        {users?.map((item, index) =>
                            <UserCard key={index} userName={item.FullName} lastMsg={item.UserName} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}

