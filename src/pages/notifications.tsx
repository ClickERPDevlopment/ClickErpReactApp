import React from "react";
import * as signalR from "@microsoft/signalr";

export default function Notifications() {
  const [connection, setConnection] = React.useState<signalR.HubConnection>();
  //   const [notification, setNotification] = React.useState(false);

  React.useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:25635/notificationhub", {
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  React.useEffect(() => {
    if (connection) {
      connection.start().then(() => {
        connection
          .invoke("GetConnectionId")
          .then((connectionId: string) =>
            console.log("connectionId: ", connectionId)
          );
        console.log("connected");

        //---------------
        connection.on("UserConnected", (message: string) => {
          console.log("message: ", message);
        });
      });
    }
  }, [connection]);

  return <div>notifications</div>;
}
