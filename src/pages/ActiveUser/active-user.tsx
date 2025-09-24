/* eslint-disable react-hooks/exhaustive-deps */
import { useNotifications } from "@/utility/NotificationProvider";
import { ActiveUserTable } from "./ActiveUserTable";
import React from "react";
import { ConnectedUser } from "./ConnectedUser";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function ActiveUsers() {
  const { reactUser } = useNotifications();
  const [data, setData] = React.useState<ConnectedUser[]>([]);
  const [isAll, setIsAll] = React.useState(true);
  const [isWeb, setIsWeb] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    handleFilterUserNew()
  }, [reactUser])

  const handleFilterUserNew = () => {
    setData([]);
    const value = isAll ? 'All' : isWeb ? 'Web' : 'Desktop';
    if (value === 'All') {
      setData(reactUser);
      return;
    }

    const fUsers = reactUser.filter((user) => user.App?.toLowerCase() === value?.toLowerCase());
    setData(fUsers);
  }


  return (
    <div className="w-full h-full py-5">
      <div className="w-full min-h-full p-5 bg-white rounded-md shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Label className="border-violet-700 text-violet-700 w-36 flex items-start gap-3 rounded-md border p-2">
              <Checkbox onCheckedChange={(e: boolean) => {
                setIsWeb(e)
                setIsDesktop(false)
                setIsAll(false)
                handleFilterUserNew()
              }} checked={isWeb} />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Web User
                </p>
                <p className="text-muted-foreground text-sm">
                  Total: {reactUser?.filter(user => user.App === 'Web').length}
                </p>
              </div>
            </Label>

            <Label className="border-violet-700 text-violet-700 w-36 flex items-start gap-3 rounded-md border p-2">
              <Checkbox onCheckedChange={(e: boolean) => {
                setIsDesktop(e)
                setIsWeb(false)
                setIsAll(false)
                handleFilterUserNew()
              }} checked={isDesktop} />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Desktop User
                </p>
                <p className="text-muted-foreground text-sm">
                  Total: {reactUser?.filter(user => user.App !== 'Web').length}
                </p>
              </div>
            </Label>

            <Label className="border-violet-700 text-violet-700 w-36 flex items-start gap-3 rounded-md border p-2">
              <Checkbox onCheckedChange={(e: boolean) => {
                setIsAll(e)
                setIsWeb(false)
                setIsDesktop(false)
                handleFilterUserNew()
              }} checked={isAll} />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  All User
                </p>
                <p className="text-muted-foreground text-sm">
                  Total: {reactUser?.length}
                </p>
              </div>
            </Label>

          </div>
        </div>
        <ActiveUserTable data={data} />
      </div>
    </div>
  )
}
