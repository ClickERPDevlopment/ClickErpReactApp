import { useNotifications } from "@/utility/NotificationProvider";
import { ActiveUserTable } from "./ActiveUserTable";

export default function ActiveUsers() {
  const { reactUser } = useNotifications();

  return (
    <div>
      {/* {JSON.stringify(reactUser)} */}
      <ActiveUserTable data={reactUser} />
    </div>
  )
}
