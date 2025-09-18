import { useNotifications } from "@/utility/NotificationProvider";
import { ActiveUserTable } from "./ActiveUserTable";

export default function ActiveUsers() {
  const { reactUser } = useNotifications();

  return (
    <div className="w-full h-full py-5">
      <ActiveUserTable data={reactUser} />
    </div>
  )
}
