import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import FormatCurrency from "./FormatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance, fetchProfile } from "../config/UserProfileSlice";
import profile from "../assets/Profile Photo.png";
import background from "../assets/Background Saldo.png"; 
import { RootState, AppDispatch } from "../config/store";

const ProfileWalletContainer = () => {
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const profiles = useSelector((state: RootState) => state.profile.data);
  const balance = useSelector((state: RootState) => state.profile.balance);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const ToggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
    dispatch(fetchBalance());
  };

  return (
    <div className="flex flex-row">
      <div className="main-photo w-1/4 px-32">
        <Image
          src={
            profiles?.profile_image ===
            "https://take-home-test-api.nutech-integrasi.com/profile/image"
              ? profile
              : profiles?.profile_image
          }
          style={{ objectFit: "cover", borderRadius: "300px" }} // Add border radius
        />
        <div className="mt-4">
          {/* Add margin top for spacing */}
          <h3 className="font-semibold font-segoe">Selamat Datang, </h3>
          <h1 className="text-2xl font-extrabold font-segoe">
            {profiles?.first_name} {profiles?.last_name}
          </h1>
        </div>
      </div>
      <div
        className="w-1/2 px-4 bg-contain bg-no-repeat ms-80"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className=" flex flex-col h-full pt-4 px-1">
          <h3 className="text-white font-segoe font-semibold text-xl">
            Saldo Anda
          </h3>
          {showBalance ? (
            <h1 className="text-white pt-4 font-segoe text-4xl font-semibold">
              {FormatCurrency(balance ?? 0)}
            </h1>
          ) : (
            <h3 className="text-white pt-4 font-segoe text-4xl font-semibold">
              Rp <span>•••••••</span>
            </h3>
          )}
          <h5
            style={{ cursor: "pointer", marginTop: "17px" }}
            onClick={ToggleBalanceVisibility}
            className="text-white pt-4 px-2 text-sm font-segoe font-semibold"
          >
            {showBalance ? "Sembunyikan Saldo" : "Lihat Saldo"}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ProfileWalletContainer;
