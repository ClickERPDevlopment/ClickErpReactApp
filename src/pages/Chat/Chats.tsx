import React from "react";
import { Input } from "@/components/ui/input";
import UserCard from "./UserCard";
import { useNotifications } from "@/utility/NotificationProvider";

export default function Chats({ selectedUser, setSelectedUser }: { selectedUser: string, setSelectedUser: React.Dispatch<React.SetStateAction<string>> }) {
    const { reactUser } = useNotifications();

    return (
        <div className="flex flex-col h-full bg-gray-100 border rounded-l-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 rounded-tl-md border-b border-b-gray-300 w-full">
                <div className="flex flex-col items-start space-y-2 w-full">
                    <h2 className="font-semibold text-lg">Chats</h2>
                    <Input placeholder="Search" className="w-full"></Input>
                </div>
            </div>

            {/* Messages Area - Fixed height with proper scrolling */}
            <div className="overflow-y-scroll flex flex-col flex-1 items-center p-2 rounded-bl-md border-b border-b-gray-300 w-full gap-1">
                <UserCard userName="All" lastMsg="" selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                {reactUser?.map(item =>
                    <UserCard userName={item.UserName} lastMsg="" selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                )}
            </div>
        </div>
    );
}

