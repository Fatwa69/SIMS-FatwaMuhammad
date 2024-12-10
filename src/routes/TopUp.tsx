import { useEffect, useState } from "react";
import { Container, Form, InputGroup, Col, Button, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { TopUpMoney } from "../config/UserProfileSlice";
import FormatCurrency from "../components/FormatCurrency";
import Swal from "sweetalert2";
import ProfileWalletContainer from "../components/ProfileWalletContainer";
import { AppDispatch } from "../config/store";

const TopUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [saldo, setSaldo] = useState<number | null>(null);
  const [isFormEmpty, setIsFormEmpty] = useState<boolean>(true);

  const nominalOptions = [10000, 20000, 50000, 100000, 250000, 500000];

  useEffect(() => {
    setIsFormEmpty(saldo === null || saldo === 0);
  }, [saldo]);

  const handleSaldoChange = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ""), 10) || null;
    setSaldo(numericValue);
    setIsFormEmpty(numericValue === null || numericValue === 0);
  };

  const handleNominalClick = (amount: number) => {
    setSaldo(amount);
    setIsFormEmpty(false);
  };

  const handleTopUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saldo === null) return;

    Swal.fire({
      title: "Konfirmasi Top Up",
      text: `Anda akan melakukan top-up sebesar ${FormatCurrency(
        saldo
      )}. Apakah Anda yakin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          if (saldo < 10000 || saldo > 1000000) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Gagal Top Up",
              text: "Min. Rp 10.000 & Maks. 1.000.000",
              confirmButtonColor: "red",
            });
            return;
          }

          const formData = {
            top_up_amount: saldo,
          };
          dispatch(TopUpMoney(formData));
          setSaldo(null);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Top Up Senilai ${FormatCurrency(saldo)} Berhasil`,
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Top Up Dibatalkan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="topup-container mt-16">
      <Container>
        <ProfileWalletContainer />
        <div className="topup-content">
          <div className="topup-header">
            <p className="topup-title">Silahkan Masukan</p>
            <p className="topup-subtitle">Nominal Top Up</p>
          </div>
          <Form onSubmit={handleTopUp}>
            <Row className="g-4">
              {/* Left Column: Input and Button */}
              <Col md={6}>
                <div className="topup-box">
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        Rp
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        aria-describedby="inputGroupPrepend"
                        placeholder="Masukan nominal"
                        value={saldo !== null ? saldo.toLocaleString() : ""}
                        onChange={(e) => handleSaldoChange(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                  <Button
                    className={`topup-button ${
                      isFormEmpty ? "button-disabled" : "button-active"
                    }`}
                    disabled={isFormEmpty}
                    type="submit"
                  >
                    Top Up
                  </Button>
                </div>
              </Col>

              {/* Right Column: Nominal Picker */}
              <Col md={6}>
                <div className="topup-box">
                  <Row className="g-2">
                    {nominalOptions.map((nominal) => (
                      <Col key={nominal} xs={6}>
                        <Button
                          variant="outline-secondary"
                          className="nominal-button"
                          onClick={() => handleNominalClick(nominal)}
                        >
                          {FormatCurrency(nominal)}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default TopUp;
