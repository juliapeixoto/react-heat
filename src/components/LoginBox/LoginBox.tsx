import { useContext } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import "./LoginBox.scss";

export function LoginBox() {
  const { signInUrl } = useContext(AuthContext);

  return (
    <div className="login__box">
      <strong className="login__box__title">
        Entre e compartilhe sua mensagem
      </strong>
      <a href={signInUrl} className="login__box__sign-in">
        <VscGithubInverted size="24" className="login__box__sign-in__logo" />
        Entrar com Github
      </a>
    </div>
  );
}
