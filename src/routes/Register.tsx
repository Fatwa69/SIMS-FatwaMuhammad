import FormRegister from "../components/FormRegister";
import HeroImage from "../components/HeroImage";

const Register = () => {
  return (
    <div className="login-container">
      <div className="form-container">
        <FormRegister />
      </div>
      <div className="hero-container">
       <HeroImage/>
      </div>
    </div>
  );
};

export default Register;
