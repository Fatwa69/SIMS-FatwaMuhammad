import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../config/UserProfileSlice";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { AppDispatch } from "../config/store";


interface Banner {
  banner_image: string;
}

const BannerSlider = () => {
  const dispatch = useDispatch<AppDispatch>();

  
  const banner = useSelector((state: any) => state.profile.banner) as Banner[];

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  return (
    <div className="px-6 py-4">
      {banner ? (
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-padding-bottom"
          dotListClass=""
          draggable
          focusOnSelect
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {banner.map((data: Banner, index: number) => (
            <Image
              src={data.banner_image}
              key={index}
              style={{ cursor: "pointer" }}
            />
          ))}
        </Carousel>
      ) : (
        <div>Loading .....</div>
      )}
    </div>
  );
};

export default BannerSlider;
