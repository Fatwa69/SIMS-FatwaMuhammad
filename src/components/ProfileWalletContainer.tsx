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
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mt-2">
      {/* Profile Section */}
      <div className="main-photo flex flex-col items-center w-full lg:w-1/4 lg:items-start lg:ms-20">
        <Image
          src={
            profiles?.profile_image ===
            "https://take-home-test-api.nutech-integrasi.com/profile/image"
              ? profile
              : profiles?.profile_image
          }
          className="object-cover rounded-full w-24 h-24 lg:w-24 lg:h-24"
        />
        <div className="mt-4 text-center lg:text-left">
          <h3 className="font-semibold font-sans">Selamat Datang,</h3>
          <h1 className="text-lg lg:text-2xl font-segoe font-bold">
            {profiles?.first_name} {profiles?.last_name}
          </h1>
        </div>
      </div>

      {/* Wallet Section */}
      <div
        className="relative w-full lg:w-1/2 xl:w-2/4 p-6 bg-cover bg-no-repeat rounded-lg lg:self-start lg:ml-auto lg:mr-20"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
        }}
      >
        {/* Wallet Content */}
        <div className="flex flex-col h-full items-center lg:items-start text-left">
          <h3 className="text-white font-segoe font-semibold text-lg lg:text-xl">
            Saldo Anda
          </h3>
          {showBalance ? (
            <h1 className="text-white font-segoe pt-2 text-2xl lg:text-4xl font-bold">
              {FormatCurrency(balance ?? 0)}
            </h1>
          ) : (
            <h3 className="text-white font-segoe pt-2 text-2xl lg:text-4xl font-bold">
              Rp <span>•••••••</span>
            </h3>
          )}
          <h5
            onClick={ToggleBalanceVisibility}
            className="text-white pt-4 lg:mt-2 text-sm font-segoe font-semibold cursor-pointer"
          >
            {showBalance ? "Sembunyikan Saldo" : "Lihat Saldo"}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ProfileWalletContainer;
