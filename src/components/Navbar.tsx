import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import logo from "../assets/Logo.png";

const NavBar = () => {
  return (
    <Navbar className="custom-navbar">
      <Container className="custom-container">
        <Navbar.Brand>
          <Link to={"/homepage"} className="navbar-brand-link">
            <div className="brand-container ms-9">
              <Image src={logo} alt="Logo" className="brand-logo" />
              <span className="brand-text font-segoe">SIMS PPOB</span>
            </div>
          </Link>
        </Navbar.Brand>

        {/* Navigation Links */}
        <Nav className="nav-links font-semibold font-segoe mr-20 space-x-6">
          <Nav.Link as="span">
            <Link
              to={"/topup"}
              className="nav-link-item hover:text-red-500 focus:text-red-500 active:text-red-500"
            >
              Top Up
            </Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link
              to={"/transaction-history"}
              className="nav-link-item hover:text-red-500 focus:text-red-500 active:text-red-500"
            >
              Transaction
            </Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link
              to={"/userprofile"}
              className="nav-link-item hover:text-red-500 focus:text-red-500 active:text-red-500"
            >
              Akun
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
