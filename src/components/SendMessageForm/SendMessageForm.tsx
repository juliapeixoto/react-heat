import { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import "./SendMessageForm.scss";

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post("messages", { message });
  }

  return (
    <div className="send__message__form">
      <button
        onClick={signOut}
        className="send__message__form__button__signout"
      >
        <VscSignOut size="32" />
      </button>

      <header className="send__message__form__user">
        <div className="send__message__form__user__image">
          <img src={user?.avatar_url} alt="Foto do usuário" />
        </div>
        <strong className="send__message__form__user__name">
          {user?.name}
        </strong>
        <span className="send__message__form__user__github">
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className="send__message__form__form">
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
