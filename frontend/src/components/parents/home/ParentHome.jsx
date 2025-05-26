import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./parenthome.css";
import SingleChild from "./SingleChild";

function ParentHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [children, setChildren] = useState([
    // {
    //   email: "",
    //   first_name: "",
    //   grade_level: "",
    //   grade_year: "",
    //   group_name: "",
    //   id: null,
    //   last_name: "",
    //   matricule: "",
    //   specialization_name: "",
    // },
  ]);
  // const [children, setChildren] = useState(null);
  // const { user } = useAuth();
  const idParent=132;
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/parents/${idParent}/children`
        );
        console.log(response.data);

        setChildren(response.data.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="parent-home">
      <div className="parent-header">
        <div className="parent-header">
          <div className="ssearch-container">
            <FaSearch className="ssearch-icon" />
            <input type="text" placeholder="Search" className="ssearch-input" />
          </div>
          <button
            className="notification-button "
            onClick={() => {
              navigate("/parent/Notifications");
            }}
          >
            <FaBell />
          </button>
        </div>

        <button
          className="add-child-btn"
          onClick={() => {
            navigate("/parent/AddChildFormule");
          }}
        >
          <AddIcon /> Add Child
        </button>
      </div>

      <div className="children all-students">
        <div className="table-wrapper">
          <h2>My Children</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>

                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {children &&
                children.map((child, index) => {
                  return <SingleChild key={index} child={child} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ParentHome;
