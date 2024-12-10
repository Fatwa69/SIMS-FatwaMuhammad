import React, { useEffect, useState } from "react";
import profile from "../assets/Profile Photo.png";
import { Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  editProfileAsync,
  editProfileImageAsync,
} from "../config/UserProfileSlice";
import { setAuthToken } from "../config/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../config/store";

const ProfileEdit: React.FC = () => {
  const [inputDisabled, setInputDisabled] = useState<boolean>(true);
  const [editButtonText, setEditButtonText] = useState<string>("Edit Profil");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleEditProfile = (): void => {
    if (inputDisabled) {
      setInputDisabled(false);
      setEditButtonText("Simpan");
    } else {
      setInputDisabled(true);
      setEditButtonText("Edit Profil");
      try {
        const updatedProfileData = {
          first_name: firstName,
          last_name: lastName,
        };
        dispatch(editProfileAsync(updatedProfileData));
      } catch (error) {
        console.log("Error updating profile:", error);
      }
    }
  };

  const navigate = useNavigate();
  const handleLogout = (): void => {
    localStorage.removeItem("jwtToken");
    setAuthToken(null);
    navigate("/");
  };

  const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files ? event.target.files[0] : null;
    if (
      file &&
      file.size <= 100 * 1024 &&
      allowedImageTypes.includes(file.type)
    ) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        dispatch(editProfileImageAsync(formData));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Foto Berhasil Diunggah",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log("Error updating profile image:", error);
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Unggah Foto Error",
        text: `Size maks 100kb`,
        confirmButtonColor: "red",
      });
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const profiles = useSelector((state: RootState) => state.profile.data);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profiles) {
      setFirstName(profiles?.first_name ?? "");
      setLastName(profiles?.last_name ?? "");
    }
  }, [profiles]);

  return (
    <div className="profile-container pt-24 px-96">
      <div className="profile-header justify-items-center">
        <Image
          src={
            profiles?.profile_image === "https://yoururlapi.com/"
              ? profile
              : profiles?.profile_image
          }
          className="profile-image"
        />
        <label htmlFor="imageInput">
          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <p className="profile-name">
          {profiles?.first_name} {profiles?.last_name}
        </p>
      </div>
      <Form className="profile-form">
        <Row className="justify-content-center">
          <Form.Group as={Col} md={8} className="form-group">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control type="email" value={profiles?.email} disabled />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md={8} className="form-group">
            <Form.Label>Nama Depan</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={inputDisabled}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md={8} className="form-group">
            <Form.Label>Nama Belakang</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={inputDisabled}
              />
            </InputGroup>
          </Form.Group>
          <div className="btn btn-danger" onClick={handleEditProfile}>
            {editButtonText}
          </div>
          {inputDisabled && (
            <div className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </div>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default ProfileEdit;
