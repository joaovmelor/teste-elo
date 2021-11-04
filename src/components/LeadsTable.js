import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import "./leadsTable.css";

function LeadsTable() {
  const [leads, setLeads] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const takeLeads = localStorage.getItem("leads");
    const storageLeads = takeLeads ? JSON.parse(takeLeads) : [];

    setLeads(storageLeads);
  }, []);

  useEffect(() => {
    const loginData = localStorage.getItem("loginData");

    if (!loginData) {
      history.push("/");
    }
  }, [history]);

  function handleStateChange(data, index) {
    const newData = {
      ...data,
      status: data.status + 1,
    };

    const leadsArray = [...leads];
    leadsArray[index] = newData;

    setLeads(leadsArray);
    localStorage.setItem("leads", JSON.stringify(leadsArray));
  }

  return (
    <div className="leads-table-wrapper">
      <Link className="add-lead-button" to="/newlead">
        Novo Lead (+)
      </Link>

      <table className="table">
        <thead>
          <tr className="table-header">
            <th>Cliente potencial</th>
            <th>Dados confirmados</th>
            <th>Reunião Agendada</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => {
            return (
              <tr key={`lead-row-${index}`} className="table-row">
                <td>
                  {lead.status === 0 ? (
                    <>
                      <span className="lead-text">{lead.company}</span>
                      <button
                        className="lead-move-button"
                        onClick={() => handleStateChange(lead, index)}
                      >
                        &gt;
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {lead.status === 1 ? (
                    <>
                      <span className="lead-text">{lead.company}</span>
                      <button
                        className="lead-move-button"
                        onClick={() => handleStateChange(lead, index)}
                      >
                        &gt;
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {lead.status === 2 ? (
                    <span className="lead-text">{lead.company}</span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;
