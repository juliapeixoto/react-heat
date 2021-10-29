import "./MessageList.scss";
import logoImg from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import io from "socket.io-client";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

let messagesQueue: Message[] = [];

const socket = io("http://localhost:4000");
socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<Message[]>("messages/last").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className="message__list">
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className="message__list__inner">
        {messages.map((message) => {
          return (
            <li key={message.id} className="message__list__inner__message">
              <p className="message__list__inner__message__content">
                {message.text}
              </p>
              <div className="message__list__inner__message__user">
                <div className="message__list__inner__message__user__image">
                  <img src={message.user.avatar_url} alt="Foto do Usuário" />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
