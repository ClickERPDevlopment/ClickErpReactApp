import React from "react";
import { useNotifications } from "@/utility/NotificationProvider";

export default function Notifications() {
  const { windowsUser, reactUser, SendMessage: sendMessage } = useNotifications();
  const [message, setMessage] = React.useState("");

  return <div>
    <span>
      notifications
    </span>
    <div style={{ border: "1px solid red", padding: "10px" }}>
      <span>
        Windows User
      </span>
      {windowsUser.map((item, index) => (
        <p key={index}>{JSON.stringify(item)}</p>
      ))}
    </div>
    <div style={{ border: "1px solid red", padding: "10px" }}>
      <span>
        All user
      </span>
      {reactUser.map((item, index) => (
        <p key={index}>{JSON.stringify(item)}</p>
      ))}
    </div>
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => sendMessage(message)} style={{ marginLeft: "10px", border: "1px solid red", padding: "10px" }}>Send Message</button>
    </div>
    <div>
      <span>
        Chat Messages
      </span>
      <div>

      </div>
    </div>
  </div>;
}
