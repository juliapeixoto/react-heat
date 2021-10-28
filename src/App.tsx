import { useContext } from "react";
import styles from "./App.module.scss";
import { LoginBox } from "./components/LoginBox/LoginBox";
import { MessageList } from "./components/MessageList/MessageList";
import { SendMessageForm } from "./components/SendMessageForm/SendMessageForm";
import { AuthContext } from "./contexts/auth";

export function App() {
  const { user } = useContext(AuthContext);
  return (
    <main className={styles.content__wrapper}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
