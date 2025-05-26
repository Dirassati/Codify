import CachedIcon from "@mui/icons-material/Cached";
import axios from "axios";
import { Captcha } from "navid-react-captcha-generator";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./login.css";

function Login() {
  const [captchaValue, setCaptchaValue] = useState(""); //stock the latest captcha code
  const [captchaInputValue, setCaptchaInputValue] = useState("");
  const [regenerate, setRegenerate] = useState(false); //to regenerate a captcha value
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleCaptchaChange(value) {
    setCaptchaValue(value);
  }

  function regenerateCaptchaCode() {
    setRegenerate((prev) => !prev);
  }

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    //console.log(captchaInputValue)
    // console.log(captchaValue)
    // console.log(user)
    console.log(userInput);

    if (captchaInputValue !== captchaValue) {
      setError("Error captcha");
      setIsLoading(false);
    } else {
      setError("");
      try {
        const response = await axios.post(
          "http://localhost:5000/api/login",
          userInput
        );

        console.log(response.data.user);

        // Store the token in localStorage (or context)
        localStorage.setItem("token", response.data.token);
        // Store the user infos  in  context
        setUser(response.data.user); 

        console.log(response);
        // Redirect to dashboard, etc.
<<<<<<< HEAD
        if (response.data.user.user_role === "enseignant") {
=======
        if (response.data.user_role === "enseignant") {
          localStorage.setItem("teacherId", response.data.user.id); // Store teacher ID
>>>>>>> 152174caf62beb2dd08e25a292aea013d2b13289
          navigate("/teacher");
        } else if (response.data.user.user_role === "parents") {
          navigate("/parent");
<<<<<<< HEAD
        } else if (response.data.user.user_role === "eleve") {
=======
        } else if (response.data.user_role === "eleve") {
          localStorage.setItem("studentId", response.data.user.id);// Store student ID
>>>>>>> 152174caf62beb2dd08e25a292aea013d2b13289
          navigate("/student");
        } else {
          navigate("/adminpannel/dashboard");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Login failed");
        console.log(err.response?.data?.message || "Login failed");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="login">
      <div className="form-container">
        <h2>DIRASSATI</h2>
        <h3>Welcom Back</h3>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ marginBottom: "10px", color: "red" }}>{error}</div>
          )}
          <div className="input-field">
            <label htmlFor="text">User Name</label>
            <input
              type="text"
              placeholder="Enter email or matricule"
              onChange={(e) => {
                setUserInput((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => {
                setUserInput((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
          </div>
          <div className="input-field">
            <label htmlFor="text">Security Text</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="text"
                placeholder="Enter the shown text"
                className="security-input"
                onChange={(e) => {
                  setCaptchaInputValue(e.target.value);
                }}
              />
              <div
                style={{
                  border: "1px solid #EAEAEA",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Captcha
                  onChange={handleCaptchaChange}
                  regenerate={regenerate}
                  width={120}
                  height={56}
                  length={5}
                  fontSize={24}
                  bgColor="#fff"
                  textColor="#000"
                  noise={false}
                  lines={true}
                  distortion={false}
                />
                <CachedIcon
                  style={{ margin: "0 15px", cursor: "pointer" }}
                  onClick={regenerateCaptchaCode}
                />
              </div>
            </div>
          </div>
          <div
            className="input-field"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="checkbox"
              name="REMEMBER ME"
              id="1"
              className="checkbox"
            />
            <p htmlFor="checkbox">Remember Me</p>
          </div>

          <button className="login-btn" type="submit">
            {IsLoading ? "loading..." : " LOG IN"}
          </button>

          <p className="forgot-password-link-container">
            <Link className="forgot-password-link" to="/forgotpassword">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
