import axios from "axios";
import { useEffect, useState } from "react";
import "./allabsences.css";

function AllAbsences() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [absences, setAbsences] = useState([]);
  const [filter, setFilter] = useState("reported");

  const [allAbsences, setAllAbsences] = useState([]);
  const [messageInputs, setMessageInputs] = useState(""); // Store refusal messages by absence ID

  const adminId = 1;

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/absences/");
        console.log("this is the data displayed : " + response.data);
        const data = response.data;
     
        setAllAbsences(data);
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Getting absences failed");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbsences();
  }, []);

  useEffect(() => {
    const filtered = allAbsences.filter((absence) => {
      if (filter === "reported") return absence.justified === false;
      if (filter === "justified") return absence.justified === true && absence.validated === false;
      if (filter === "validated") return absence.validated === true;
      return false;
    });

    setAbsences(filtered);
  }, [filter, allAbsences]);

  const handleValidate = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/absences/validate", {
        absenceId: id,
        adminId: adminId,
        validated: true,
        message: null,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Validation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefuse = async (id) => {
    const refusalMessage = messageInputs || null; // Get message input for this absence

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/absences/validate", {
        absenceId: id,
        adminId: adminId,
        validated: false,
        message: refusalMessage,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Refusal failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageChange = (e) => {
    setMessageInputs(e.target.value);
  };

  return (
    <div className="absence-container">
      <div className="header-controls">
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="reported">Reported</option>
          <option value="justified">Justified</option>
          <option value="validated">Validated</option>
        </select>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading absences...</p>
        </div>
      ) : message ? (
        <div className="error-container">
          <p className="error-message">{message}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : (
        <div className="absence-list">
          {absences.length === 0 ? (
            <p>No absences found for selected filter.</p>
          ) : (
            absences.map((absence) => (
              <div key={absence.id} className="absence-card">
                <p><strong>ID:</strong> {absence.id}</p>
                <p><strong>Student ID:</strong> {absence.student_id}</p>
                <p><strong>Date:</strong> {new Date(absence.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {absence.timing}</p>
                <p><strong>Justified:</strong> {absence.justified ? "Yes" : "No"}</p>
                <p><strong>Validated:</strong> {absence.validated ? "Yes" : "No"}</p>
                {absence.justification_text && (
                  <p><strong>Reason:</strong> {absence.justification_text}</p>
                )}
                {filter === "justified" && !absence.validated && (
                  <div className="action-buttons">
                    {/* Input for refusal message */}
               
                    <button className="validate-btn" onClick={() => handleValidate(absence.id)}>
                      ✅ Validate
                    </button>
                    <button className="refuse-btn" onClick={() => handleRefuse(absence.id)}>
                      ❌ Refuse
                    </button>
                        
                  </div>
                  
                )}
                 {filter === "justified" && !absence.validated &&<input
                      type="text"
                      placeholder="Optional refusal message"
                      value={messageInputs|| ""}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      className="message-input"
                    />
                 }
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AllAbsences;
