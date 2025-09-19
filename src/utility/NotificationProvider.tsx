/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
// src/context/NotificationContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import useApiUrl from "@/hooks/use-ApiUrl";
import { useAuth } from "@/lib/auth-provider";
import { ConnectedUser } from "@/pages/ActiveUser/ConnectedUser";


type NotificationContextType = {
  connection?: signalR.HubConnection;
  ClientInfo?: ConnectedUser;
  windowsUser: ConnectedUser[];
  reactUser: ConnectedUser[];
  message?: string;
  SendMessage: (msg: string) => void;
  SendChatMessageToUser: (userName: string, msg: string) => void;
  GetClientInfo: (userName: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [connection, setConnection] = useState<signalR.HubConnection>();
  const [windowsUser, setWindowsUser] = useState<ConnectedUser[]>([]);
  const [reactUser, setReactUser] = useState<ConnectedUser[]>([]);
  const [message, setMessage] = useState<string>();
  const [ClientInfo, setClientInfo] = useState<ConnectedUser>();
  const api = useApiUrl();
  const user = useAuth();


  // Create connection
  useEffect(() => {
    if (connectionRef.current) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(api.ProductionRootUrl + "/notificationhub", {
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = newConnection;

    setConnection(newConnection);
  }, []);

  // Start connection and register listeners
  useEffect(() => {
    if (!connection) return;

    connection
      .start()
      .then(() => {
        console.log("✅ Connected to SignalR");

        connection.on("UserConnected", (ConnectionId: string) => {
          console.log("User ConnectionId: ", ConnectionId);
          console.log("user: ", user);
          connection.invoke("UpdateClientInfo", ("Najmuzzaman"), ConnectionId, "Web");

          connection.invoke("GetConnectedClient").then((lst: ConnectedUser[]) => {
            setReactUser(lst);
          });
          connection.invoke("GetWindowsConnectedClient").then((lst: ConnectedUser[]) => {
            setWindowsUser(lst);
          });
        });

        connection.on("ConnectedClientStatus", (lst: ConnectedUser[]) => {
          setReactUser(lst);
        });

        connection.on("WindowsConnectedClientStatus", (lst: ConnectedUser[]) => {
          setWindowsUser(lst);
        });

        connection.on("GetMessage", (message: string) => {
          if (message)
            setMessage(message);
        });
      })
      .catch((err) => console.error("❌ SignalR Connection failed: ", err));

    return () => {
      connection.stop();
    };
  }, [connection]);

  function SendMessage(msg: string) {
    if (connection && msg) {
      connection.invoke("SendMessage", msg);
    }
  }

  function SendChatMessageToUser(userName: string, msg: string) {
    if (connection && userName && msg) {
      connection.invoke("SendChatMessageToUser", userName, msg);
    }
  }

  function GetClientInfo(userName: string) {
    if (connection && userName) {
      connection.invoke("GetClientInfo", userName).then((u: ConnectedUser) => {
        setClientInfo(u);
      });
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        connection,
        windowsUser,
        reactUser,
        message,
        SendMessage,
        SendChatMessageToUser,
        GetClientInfo,
        ClientInfo
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }
  return context;
}
