import { useNotifications } from "@/utility/NotificationProvider";
import { ActiveUserTable } from "./ActiveUserTable";

export default function ActiveUsers() {
  const { reactUser } = useNotifications();

  return (
    <div className="w-full h-full">
      <ActiveUserTable data={reactUser} />
    </div>
  )
}
