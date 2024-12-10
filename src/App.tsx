import { Route, Routes, useParams } from "react-router";
import RootLayout from "./components/RootLayout";
import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import PurchaseBuy from "./routes/Purchase";
import EditProfile from "./routes/EditProfile";
import TopUp from "./routes/TopUp";
import TransactionHistory from "./routes/TransactionHistory";
import Register from "./routes/Register";
import { useSelector } from "react-redux";
import { RootState } from "./config/store";
import { useEffect, useState } from "react";



interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}
// New component that fetches the service by ID
const PurchaseWithService = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const [service, setService] = useState<Service | null>(null);

  // Get services from Redux store
  const services = useSelector((state: RootState) => state.profile.services);

  // Check if services are available and if `id` is provided
  useEffect(() => {
    if (id && services) {
      const selectedService = services.find(
        (service) => service.service_code === id
      );
      setService(selectedService || null); // Set the selected service
    }
  }, [id, services]);

  if (!service) {
    return <div>Loading...</div>; // You can display a loading spinner or message while the service is being fetched
  }

  return <PurchaseBuy service={service} />;
};

function App() {
  return (
    <>
      <Routes>
        {/* landing page tanpa layout navbar footer */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RootLayout />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/purchase/:id" element={<PurchaseWithService />} />
          <Route path="/userprofile" element={<EditProfile />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
