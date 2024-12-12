import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchServices, selectServices } from "../config/UserProfileSlice";
import { AppDispatch } from "../config/store";

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

const ServiceCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Use the memoized selector
  const produk = useSelector(selectServices) as unknown as Service[];

  useEffect(() => {
    // Only dispatch if the array is empty
    if (produk.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, produk.length]);

  return (
    <div className="mt-12 mb-12 text-center flex flex-wrap justify-center">
      {produk.map((banners: Service, index: number) => (
        <div
          key={banners.service_code || index}
          className="flex flex-col items-center px-2 mr-2 hover:cursor-pointer hover:text-red-500"
          onClick={() => navigate(`/purchase/${banners.service_code}`)} 
        >
          <Image
            src={banners.service_icon}
            className="ms-2 me-2"
            style={{ width: "60px", height: "60px", objectFit: "contain" }}
          />
          <h3 className="text-center text-xs font-semibold font-segoe mt-2">
            {banners.service_name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ServiceCategories;
