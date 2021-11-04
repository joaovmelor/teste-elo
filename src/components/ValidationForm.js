import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./ValidationForm.css";

function ValidationForm() {
  const [company, setCompany] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const [checkboxes, setCheckBoxes] = useState(false);
  const [rpa, setRpa] = useState(false);
  const [digitalproduct, setDigitalProduct] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [bpm, setBpm] = useState(false);

  const [errorCompany, setErrorCompany] = useState();
  const [errorTelephone, setErrorTelephone] = useState();
  const [errorEmail, setErrorEmail] = useState();

  const history = useHistory();

  useEffect(() => {
    if (rpa && digitalproduct && analytics && bpm) {
      setCheckBoxes(true);
    } else {
      setCheckBoxes(false);
    }
  }, [rpa, digitalproduct, analytics, bpm]);

  useEffect(() => {
    const loginData = localStorage.getItem("loginData");

    if (!loginData) {
      history.push("/");
    }
  }, [history]);

  function handleFormSubmit(event) {
    event.preventDefault();
    const lead = {
      company,
      telephone,
      email,
      opportunities: { rpa, digitalproduct, analytics, bpm },
      status: 0,
    };

    const currentLeads = localStorage.getItem("leads");
    const object = currentLeads ? JSON.parse(currentLeads) : [];

    const leadsArray = [...object, lead];

    localStorage.setItem("leads", JSON.stringify(leadsArray));

    setCompany("");
    setTelephone("");
    setEmail("");
    setRpa(false);
    setDigitalProduct(false);
    setAnalytics(false);
    setBpm(false);
    setCheckBoxes(false);

    alert("Nova lead registrada!");
  }

  function handleUsernameChange(data) {
    setCompany(data);

    if (/^.+$/.test(data)) {
      setErrorCompany();
    } else {
      setErrorCompany(
        "O nome da companhia deve possuir um ou mais caracteres."
      );
    }
  }

  function handleTelephoneChange(data) {
    setTelephone(data);

    if (/^\d{11}$/.test(data)) {
      setErrorTelephone();
    } else {
      setErrorTelephone(
        "O telefone deve conter onze caracteres numéricos, incluindo o DDD."
      );
    }
  }

  function handleEmailChange(data) {
    setEmail(data);

    if (/^\w+@[A-Za-z0-9]+\.[A-Za-z0-9.]*$/.test(data)) {
      setErrorEmail();
    } else {
      setErrorEmail(
        "O email não segue um formato apropriado, exemplo: usuario@dominio.com ."
      );
    }
  }

  function toggleCheckboxes(checkboxes) {
    setCheckBoxes(checkboxes);
    setRpa(checkboxes);
    setDigitalProduct(checkboxes);
    setAnalytics(checkboxes);
    setBpm(checkboxes);
  }

  const hasErrors = errorCompany || errorTelephone || errorEmail;

  return (
    <div className="validation-container">
      <h1>NOVA LEAD</h1>
      <form className="validation-form" onSubmit={handleFormSubmit}>
        <label className="validation-label">
          Company:
          <input
            type="text"
            name="company"
            value={company}
            onChange={(event) => handleUsernameChange(event.target.value)}
            required
          />
          <span>{errorCompany}</span>
        </label>
        <label className="validation-label">
          Telefone:
          <input
            type="text"
            name="telephone"
            value={telephone}
            onChange={(event) => handleTelephoneChange(event.target.value)}
            required
          />
          <span>{errorTelephone}</span>
        </label>

        <label className="validation-label">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
            required
          />
          <span>{errorEmail}</span>
        </label>

        <table className="validation-opportunities">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(event) => toggleCheckboxes(event.target.checked)}
                  checked={checkboxes}
                />
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div>
                  <input
                    type="checkbox"
                    onChange={() => setRpa((state) => !state)}
                    checked={rpa}
                  />
                </div>
              </td>
              <td>RPA</td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  onChange={() => setDigitalProduct((state) => !state)}
                  checked={digitalproduct}
                />
              </td>
              <td>Produto Digital</td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  onChange={() => setAnalytics((state) => !state)}
                  checked={analytics}
                />
              </td>
              <td>Analytics</td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  onChange={() => setBpm((state) => !state)}
                  checked={bpm}
                />
              </td>
              <td>BPM</td>
            </tr>
          </tbody>
        </table>
        <button
          className="form-validation-submit"
          type="submit"
          disabled={hasErrors}
        >
          Salvar!
        </button>
      </form>
    </div>
  );
}

export default ValidationForm;
