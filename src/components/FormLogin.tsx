import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Image } from "react-bootstrap";
import { Link } from "react-router";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { CiAt, CiLock } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/Logo.png";
import { loginUser, setAuthToken } from "../config/api";

const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" && value.length >= 8) {
      setPasswordError(false);
    }
  };

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email format is invalid.");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      setPasswordError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await loginUser(formData);
      const token = response.data?.data?.token;

      if (token) {
        setAuthToken(token);
        localStorage.setItem("jwtToken", token);
        toast.success("Login successful! Redirecting...");

        // Redirect to homepage
        setTimeout(() => navigate("/homepage"), 2000);
      } else {
        toast.error("Token not received. Please try again.");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-login-container font-segoe">
      <ToastContainer position="bottom-left" />
      <div className="form-login-header">
        <div className="flex items-center justify-center gap-x-1 mt-4 mb-6">
          <Image src={logo} />
          <span className="text-4xl font-semibold">SIMS PPOB</span>
        </div>
        <p className="text-5xl mb-8 text-center auto-cols-max font-semibold ">
          Masuk atau buat akun untuk memulai
        </p>
      </div>
      <Form onSubmit={handleSubmit} className="form-login">
        <Form.Group controlId="formEmail" className="form-group">
          
          <div className="input-wrapper">
            <span className="input-icon">
              <CiAt />
            </span>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </Form.Group>

        <Form.Group controlId="formPassword" className="form-group">
          
          <div className="input-wrapper">
            <span className="input-icon">
              <CiLock />
            </span>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`form-input ${
                passwordError ? "border border-danger" : ""
              }`}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </Form.Group>

        <Button
          style={{ backgroundColor: "#f82c14" }}
          type="submit"
          className="form-login-btn"
        >
          Login
        </Button>

        <div className="form-footer">
          <span className="form-footer-text">
            Belum punya akun?
            <Link to={"/register"} className="font-semibold text-[#f82c14]">
              Daftar disini
            </Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default FormLogin;
