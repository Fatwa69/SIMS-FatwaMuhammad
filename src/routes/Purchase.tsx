import React, { FormEvent, useEffect } from "react";
import {
  Container,
  Form,
  Image,
  InputGroup,
  Col,
  Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { RootState } from "../config/store";
import { TransactionAsync, fetchBalance } from "../config/UserProfileSlice";
import FormatCurrency from "../components/FormatCurrency";
import ProfileWalletContainer from "../components/ProfileWalletContainer";

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

interface PurchaseProps {
  service: Service;
}

const Purchase: React.FC<PurchaseProps> = ({ service }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();

  const handleTransaction = (e: FormEvent) => {
    e.preventDefault();

  
    Swal.fire({
      title: "Konfirmasi Pembayaran",
      text: `Apakah Anda yakin ingin membayar ${FormatCurrency(
        service.service_tariff
      )} untuk ${service.service_name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f82c14", 
      cancelButtonColor: "#3085d6", 
      confirmButtonText: "Ya, Bayar!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const serviceCode = service.service_code;
        const amount = service.service_tariff;

        if (!serviceCode || !amount) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Layanan tidak valid",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }

        const formData = {
          service_code: serviceCode,
          service_id: Number(serviceCode),
          amount: amount,
        };

        dispatch(TransactionAsync(formData))
          .then((result) => {
            if (result.meta.requestStatus === "rejected") {
              Swal.fire({
                position: "center",
                icon: "error",
                title: `Gagal Bayar ${service.service_name}`,
                text: "Saldo tidak cukup, Top Up untuk membayar",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `Berhasil membayar ${service.service_name}`,
                showConfirmButton: false,
                timer: 3000,
              });
            }
          })
          .catch((error) => {
            console.error("Transaction error:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Terjadi kesalahan",
              text: error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Pembayaran Dibatalkan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <div className="pt-24">
      <Container>
        <ProfileWalletContainer />
        <div className="row ms-3 mt-4">
          <div className="mt-4 justify-items-center">
            <p className="font-segoe text-xl text-center">Pembayaran</p>
            <p className="font-semibold mt-2 text-center">
              {service.service_icon && (
                <Image src={service.service_icon} className="mb-2 ms-2" />
              )}
              {service.service_name}
            </p>
          </div>
          <Form onSubmit={handleTransaction} className="px-6 mt-3">
            <Form.Group
              as={Col}
              md={12}
              className="mb-3"
              controlId="formGroupEmail"
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <FontAwesomeIcon icon={faMoneyCheckDollar} />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  aria-describedby="inputGroupPrepend"
                  value={service.service_code || ""}
                  placeholder={
                    service.service_tariff
                      ? FormatCurrency(service.service_tariff)
                      : "Tarif tidak tersedia"
                  }
                  disabled
                  style={{ width: "100%", textAlign: "right" }}
                />
              </InputGroup>
            </Form.Group>
            <Button
              type="submit"
              className="text-white font-semibold font-segoe mt-2 rounded-lg bg-[#f82c14] border-[#ff0000]"
              style={{
                backgroundColor: "#ff0000",
                borderColor: "#f95050",
                fontSize: "16px", 
                padding: "12px", 
              }}
              disabled={!service}
            >
              Bayar
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Purchase;
