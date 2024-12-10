import FormLogin from "../components/FormLogin";
import HeroImage from "../components/HeroImage";

const Login = () => {
  return (
    <div className="login-container">
      <div className="form-container">
        <FormLogin />
      </div>
      <div className="hero-container">
        <HeroImage />
      </div>
    </div>
  );
};

export default Login;
