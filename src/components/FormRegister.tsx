import { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiAt, CiUser, CiLock } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../config/api"; 
import logo from "../assets/Logo.png";

const FormRegister = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    try {
      const response = await registerUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === 0) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 3000); 
      } else {
        toast.error(response.data.message || "Registration failed!");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "An error occurred during registration."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="form-login-container">
      <div className="form-login-header">
        <div className="flex items-center justify-center gap-x-1 mb-2">
          <Image src={logo} />
          <span className="text-xl font-semibold">SIMS PPOB</span>
        </div>
        <p className="text-4xl text-center font-semibold">
          Masuk atau buat akun untuk memulai
        </p>
      </div>
      <Form onSubmit={handleSubmit} className="form-login">
        <ToastContainer position="bottom-left" />

        
        <Form.Group controlId="formEmail" className="form-group">
          <Form.Label className="form-label"></Form.Label>
          <div className="input-wrapper">
            <span className="input-icon pr-2">
              <CiAt />
            </span>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input pl-8"
            />
          </div>
        </Form.Group>

        
        <Form.Group controlId="formFirstName" className="form-group">
          <Form.Label className="form-label"></Form.Label>
          <div className="input-wrapper">
            <span className="input-icon pr-2">
              <CiUser />
            </span>
            <Form.Control
              type="text"
              placeholder="Nama Depan"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="form-input pl-8"
            />
          </div>
        </Form.Group>

        
        <Form.Group controlId="formLastName" className="form-group">
          <Form.Label className="form-label"></Form.Label>
          <div className="input-wrapper">
            <span className="input-icon pr-2">
              <CiUser />
            </span>
            <Form.Control
              type="text"
              placeholder="Nama Belakang"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="form-input pl-8"
            />
          </div>
        </Form.Group>

        
        <Form.Group controlId="formPassword" className="form-group">
          <Form.Label className="form-label"></Form.Label>
          <div className="input-wrapper">
            <span className="input-icon pr-2">
              <CiLock />
            </span>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Buat Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input pl-8"
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

        
        <Form.Group controlId="formConfirmPassword" className="form-group">
          <Form.Label className="form-label">
          </Form.Label>
          <div className="input-wrapper">
            <span className="input-icon pr-2">
              <CiLock />
            </span>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmasi Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input pl-8"
            />
            <span
              className="password-toggle"
              onClick={toggleConfirmPasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </Form.Group>

        <Button
          style={{ backgroundColor: "#f82c14" }}
          type="submit"
          className="form-login-btn"
        >
          Register
        </Button>
        <div className="form-footer">
          <span className="form-footer-text">
            Sudah punya akun?{" "}
            <Link to="/" className="font-semibold text-[#f82c14]">
              Login disini
            </Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default FormRegister;
