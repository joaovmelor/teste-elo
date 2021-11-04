import LoginForm from "./components/LoginForm";
import LeadsTable from "./components/LeadsTable";
import ValidationForm from "./components/ValidationForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="main">
      <Router>
        <div className="header">
          <img
            src="https://elogroup.com.br/wp-content/uploads/2021/08/Logo-2.svg"
            className="logo"
            alt="elogroup-logo"
          />

          <div className="navigation">
            <Link className="nav-link" to="/">
              Login
            </Link>
            <Link className="nav-link" to="/leads">
              Leads
            </Link>
            <Link className="nav-link" to="/newlead">
              Nova Lead
            </Link>
          </div>
        </div>

        <div className="content">
          <Switch>
            <Route path="/leads">
              <LeadsTable />
            </Route>

            <Route path="/newlead">
              <ValidationForm />
            </Route>

            <Route path="/">
              <LoginForm />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
