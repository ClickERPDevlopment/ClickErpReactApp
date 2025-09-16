import React from "react";
import * as signalR from "@microsoft/signalr";

export type ConnectedUser = {
  ConnectionId: string;
  UserName: string;
  FullName: string;
  Designation: string;
};

export default function Notifications() {
  const [connection, setConnection] = React.useState<signalR.HubConnection>();
  const [windowsUser, setWindowsUser] = React.useState<ConnectedUser[]>([]);
  //   const [notification, setNotification] = React.useState(false);

  React.useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:40000/notificationhub", {
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
          .invoke("GetWindowsConnectedClient")
          .then((lstConnectedUser: ConnectedUser[]) => {
            setWindowsUser(lstConnectedUser);
            console.log("GetWindowsConnectedClient: ", lstConnectedUser)
          });
        console.log("connected");

        //---------------
        connection.on("UserConnected", (message: string) => {
          console.log("UserConnected: ", message);
        });

        connection.on(
          "WindowsConnectedClientStatus",
          (lstConnectedUser: ConnectedUser[]) => {
            console.log("WindowsConnectedClientStatus: ", lstConnectedUser);
          }
        );
      });
    }
  }, [connection]);

  return <div>
    <span>
      notifications
    </span>
    <p>{JSON.stringify(connection)}</p>
    <div style={{ border: "1px solid red", padding: "10px" }}>
      <span>
        windowsUser
      </span>
      <p>{JSON.stringify(windowsUser)}</p>
    </div>
  </div>;
}
