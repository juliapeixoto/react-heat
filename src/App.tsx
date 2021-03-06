import { useContext } from "react";
import "./App.scss";
import { LoginBox } from "./components/LoginBox/LoginBox";
import { MessageList } from "./components/MessageList/MessageList";
import { SendMessageForm } from "./components/SendMessageForm/SendMessageForm";
import { AuthContext } from "./contexts/auth";

export function App() {
  const { user } = useContext(AuthContext);
  return (
    <main
      className={`${"content__wrapper"} ${!!user ? "content__signed" : ""}`}
    >
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
