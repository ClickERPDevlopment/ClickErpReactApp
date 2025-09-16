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
  const [reactUser, setReactUser] = React.useState<ConnectedUser[]>([]);
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
          });
        console.log("connected");

        connection
          .invoke("GetConnectedClient")
          .then((lstConnectedUser: ConnectedUser[]) => {
            setReactUser(lstConnectedUser);
          });

        //---------------
        connection.on("UserConnected", (message: string) => {
          console.log("UserConnected: ", message);
        });

        connection.on(
          "ConnectedClientStatus",
          (lstConnectedUser: ConnectedUser[]) => {
            console.log("React App Clients: ", lstConnectedUser);
          }
        );

        connection.on(
          "WindowsConnectedClientStatus",
          (lstConnectedUser: ConnectedUser[]) => {
            console.log("Windows Clients: ", lstConnectedUser);
          }
        );
        connection.on("GetMessage", (message: string) => {
          setShowMessage((prev) => [...prev, message]);
        });
      });
    }
  }, [connection]);

  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = React.useState<string[]>([]);


  function handleSendMessage() {
    if (connection && message) {
      connection.invoke("SendMessage", message);
    }
  }

  return <div>
    <span>
      notifications
    </span>
    {/* <p>{JSON.stringify(connection)}</p> */}
    <div style={{ border: "1px solid red", padding: "10px" }}>
      <span>
        windowsUser
      </span>
      <p>{JSON.stringify(windowsUser)}</p>
    </div>
    <div style={{ border: "1px solid red", padding: "10px" }}>
      <span>
        React user
      </span>
      <p>{JSON.stringify(reactUser)}</p>
    </div>
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => handleSendMessage()} style={{ marginLeft: "10px", border: "1px solid red", padding: "10px" }}>Send Message</button>
    </div>
    <div>
      <span>
        showMessage
      </span>
      <div>
        {showMessage.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  </div>;
}
