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

  React.useEffect(() => {
    handleFilterUserNew('All')
  }, [reactUser])

  const handleFilterUserNew = (value: '' | 'All' | 'Web' | 'Desktop') => {
    if (value === 'All' || value === '') {
      setData(reactUser);
      return;
    }

    const fUsers = reactUser.filter((user) => user.App?.toLowerCase() === value?.toLowerCase());
    setData(fUsers);
  }
  const [isAll, setIsAll] = React.useState(true);
  const [isWeb, setIsWeb] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

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
                handleFilterUserNew('Web')
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
                handleFilterUserNew('Desktop')
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
                handleFilterUserNew('All')
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
          {/* <div className="flex items-center gap-2">
            <span className="text-fuchsia-700">Web User: {data?.filter(user => user.App === 'Web').length}</span>
            <span className="text-emerald-700">Desktop User: {data?.filter(user => user.App !== 'Web').length}</span>
            <span className="text-violet-700">Total User: {data?.length}</span>
          </div> */}
        </div>
        <ActiveUserTable data={data} />
      </div>
    </div>
  )
}
