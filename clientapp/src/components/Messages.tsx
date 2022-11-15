import React, { useEffect, useState } from "react";
import { MessageProps } from "../App";

export const Messages: React.FC<MessageProps> = (messageProps) => {
  const [date, setDate] = useState<Date>();
  const [messagesList, setMessagesList] = useState<string[]>([]);

  useEffect(() => {
    messageProps.HubConnection.on("sendToReact", (message) => {
      setMessagesList([...messagesList,message]);
      setDate(new Date());
    });
  }, []);

  return (
    <>
      {messagesList?.map((message, index) => {
        console.log(index);
        return <p key={index}>{message}</p>;
      })}
    </>
  );
};
