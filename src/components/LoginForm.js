import { useState } from "react";
import { useHistory } from "react-router-dom";

import "./loginForm.css";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorUsername, setErrorUsername] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorConfirmPassword, setErrorConfirmPassword] = useState();

  const history = useHistory();

  function handleFormSubmit(event) {
    event.preventDefault();
    const loginData = {
      userName,
      password,
      confirmPassword,
    };
    const currentLoginData = localStorage.getItem("loginData");
    const changingForObject = currentLoginData
      ? JSON.parse(currentLoginData)
      : [];
    const ArrayLoginData = [...changingForObject, loginData];

    localStorage.setItem("loginData", JSON.stringify(ArrayLoginData));

    setUserName("");
    setPassword("");
    setConfirmPassword("");

    history.push("/leads");
  }

  function handleUsernameChange(data) {
    setUserName(data);

    const matchesRegex = /^\w+$/.test(data);
    if (matchesRegex) {
      setErrorUsername();
    } else {
      setErrorUsername(
        "Usuário deve conter um ou mais caracteres porém não são permitidos espaços e/ou caracteres especiais."
      );
    }
  }

  const hasErrors = errorUsername || errorPassword || errorConfirmPassword;

  function handlePasswordChange(data) {
    setPassword(data);

    if (!/.{8,}/.test(data)) {
      setErrorPassword("Senha deve conter pelo menos oito caracteres.");
    } else if (!/[^A-Za-z0-9]/.test(data)) {
      setErrorPassword("Senha deve conter pelo menos um caractere especial.");
    } else if (!/\d/.test(data)) {
      setErrorPassword("Senha deve conter pelo menos um caractere numérico.");
    } else if (!/[A-Za-z]/.test(data)) {
      setErrorPassword("Senha deve conter pelo menos um caractere alfabético.");
    } else {
      setErrorPassword();
    }

    if (data === confirmPassword) {
      setErrorConfirmPassword();
    } else {
      setErrorConfirmPassword("Suas senhas não são correspondentes.");
    }
  }

  function handleConfirmPasswordChange(data) {
    setConfirmPassword(data);

    if (data === password) {
      setErrorConfirmPassword();
    } else {
      setErrorConfirmPassword("Suas senhas não são correspondentes.");
    }
  }

  return (
    <div className="login-container">
      <h1>REGISTER</h1>

      <form className="login-form" onSubmit={handleFormSubmit}>
        <label className="form-label">
          Nome:
          <input
            type="text"
            name="name"
            value={userName}
            onChange={(event) => handleUsernameChange(event.target.value)}
            required
          />
          <span>{errorUsername}</span>
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => handlePasswordChange(event.target.value)}
            required
          />
          <span>{errorPassword}</span>
        </label>
        <label className="form-label">
          Confirme Password:
          <input
            type="password"
            name="confirmpassword"
            value={confirmPassword}
            onChange={(event) =>
              handleConfirmPasswordChange(event.target.value)
            }
            required
          />
          <span>{errorConfirmPassword}</span>
        </label>
        <button className="form-submit" type="submit" disabled={hasErrors}>
          Registrar
        </button>
      </form>
      <br />
    </div>
  );
}

export default LoginForm;
