import ServiceCategories from "../components/ServiceCategories";
import BannerSlider from "../components/BannerSlider";
import { Container, Row, Col } from "react-bootstrap";
import ProfileWalletContainer from "../components/ProfileWalletContainer";

const HomePage = () => {
  return (
    <div className="pt-24">
      <Container>
        <Row>
          <ProfileWalletContainer />
        </Row>
        <Row>
          <Col xs={3}>
            <ServiceCategories />
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-xl font-bold font-segoe px-6">
              Temukan promo menarik
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <BannerSlider />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
