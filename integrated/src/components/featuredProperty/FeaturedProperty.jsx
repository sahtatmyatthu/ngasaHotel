import "./featuredProperty.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
// import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import useFetch from "../../hooks/useFetch";
const FeaturedProperties = () => {
  const { data, loading } = useFetch(
    `/api/rooms/getByrating`
  );

  return (
    <div className="fp">
      {loading ? (
        "loading"
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          autoplay={{ delay: 3000 }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.room_id || item._id}>
              <div className="fpItem">
                <img src={item?.photos[0]} alt="" className="fpImg" />
                <span className="fpName">Room No.{item?.roomnumber}</span>
                <span className="fpName">{item?.roomtype} room</span>
                <span className="fpPrice"> {item?.price}$</span>
                <div className="fpRating">
                  <button>8.9</button>
                  <span>Excellent</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FeaturedProperties;
