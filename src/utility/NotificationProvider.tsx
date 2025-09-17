/* eslint-disable react-refresh/only-export-components */
// src/context/NotificationContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import useApiUrl from "@/hooks/use-ApiUrl";
import { useAuth } from "@/lib/auth-provider";
import { ConnectedUser } from "@/pages/ActiveUser/ConnectedUser";


type NotificationContextType = {
  connection?: signalR.HubConnection;
  windowsUser: ConnectedUser[];
  reactUser: ConnectedUser[];
  chatMessages: string[];
  sendChatMessage: (msg: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [connection, setConnection] = useState<signalR.HubConnection>();
  const [windowsUser, setWindowsUser] = useState<ConnectedUser[]>([]);
  const [reactUser, setReactUser] = useState<ConnectedUser[]>([]);
  const [chatMessages, setChatMessage] = useState<string[]>([]);
  const api = useApiUrl();
  const user = useAuth();


  // Create connection
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(api.ProductionRootUrl + "/notificationhub", {
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [api.ProductionRootUrl]);

  // Start connection and register listeners
  useEffect(() => {
    if (!connection) return;

    connection
      .start()
      .then(() => {
        console.log("✅ Connected to SignalR");

        connection.on("UserConnected", (ConnectionId: string) => {
          console.log("UserConnected: ", ConnectionId);
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
          setChatMessage((prev) => [...prev, message]);
        });
      })
      .catch((err) => console.error("❌ SignalR Connection failed: ", err));

    return () => {
      connection.stop();
    };
  }, [connection]);

  function sendChatMessage(msg: string) {
    if (connection && msg) {
      connection.invoke("SendMessage", msg);
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        connection,
        windowsUser,
        reactUser,
        chatMessages,
        sendChatMessage,
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
