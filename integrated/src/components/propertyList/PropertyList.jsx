import "./propertyList.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  
  const { data, loading, error } = useFetch(`/api/rooms/countByType`);
  const images = [
   "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
   "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
   "https://ramadalucknow.com/wp-content/uploads/2018/07/Studio-Room-Lucknow-Ramada-Lucknow-Hotel.jpg",
   "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=1600",
   "https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?size=626&ext=jpg",
  ]
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
        >
          {data &&
            images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="pListItem">
                  <img src={img} alt="" className="pListImg" />
                  <div className="pListTitles">
                    <h1>{data[i]?.roomtype}</h1>
                    <h2>{data[i]?.count} Room</h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default PropertyList;
