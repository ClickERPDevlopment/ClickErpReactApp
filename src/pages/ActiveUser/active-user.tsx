/* eslint-disable react-hooks/exhaustive-deps */
import { useNotifications } from "@/utility/NotificationProvider";
import { ActiveUserTable } from "./ActiveUserTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { ConnectedUser } from "./ConnectedUser";
import { Button } from "@/components/ui/button";

export default function ActiveUsers() {
  const { reactUser } = useNotifications();
  const [data, setData] = React.useState<ConnectedUser[]>([]);
  const [app, setApp] = React.useState<string>('');

  React.useEffect(() => {
    handleFilterUser()
  }, [reactUser])

  const handleFilterUser = () => {
    const value = app;
    if (value === 'All' || value === '') {
      setData(reactUser);
      return;
    }

    const fUsers = reactUser.filter((user) => user.App.toLowerCase() === value.toLowerCase());
    setData(fUsers);
  }

  return (
    <div className="w-full h-full py-5">
      <div className="w-full min-h-full p-5 bg-white rounded-md shadow-sm flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Select onValueChange={(e) => setApp(e)}>
            <SelectTrigger className="w-[180px] border-gray-400">
              <SelectValue placeholder="Select App" className="placeholder:text-gray-400" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Web">Web</SelectItem>
              <SelectItem value="Desktop">Desktop</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleFilterUser}>Refresh</Button>
        </div>
        <ActiveUserTable data={data} />
      </div>
    </div>
  )
}
