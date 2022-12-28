import "./room.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import ReactStars from "react-rating-stars-component";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm"
import { AuthContext } from "../../context/AuthContext";

const Room = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [startDate, setStartDate] = useState(
    new Date(location.state.startDate)
  );
  const [endDate, setEndDate] = useState(new Date(location.state.endDate));
  const [options, setOptions] = useState(location.state.options);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(
    `/api/rooms/find/${id}`
  );
 
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const dffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return dffDays;
  }

  const days = dayDifference(endDate, startDate);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
 
  const alldates = getDatesInRange(startDate, endDate);

 
  const isAvailable = function () {
    let fromdb = [];
    data.unavailableDates?.map(item=>{
      fromdb.push( new Date(item).getTime())
     })

    let result = alldates.filter((date) => !fromdb.includes(date));
   
    return result;
  };

 const available = isAvailable();
 

  const showdaynight = alldates.length == 1 ? "1 day" : `${days} nights`;
  let dateString = [];
  alldates.map((item) => {
    dateString.push(new Date(item).toLocaleDateString());
  });

  const starCount = {
    count: 3,
    size: 25,
    value: 2.5,
    edit: false,
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const hanldeClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="roomContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <Swiper
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {data.photos.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="sliderWrapper">
                    <img src={data.photos[i]} alt="" className="sliderImg" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        <div className="roomWrapper">
          <div className="roomTitle">Single Room</div>
          <div className="roomRating">
            <ReactStars className="star" {...starCount} />
            <span className="rate">Excellent</span>
          </div>
          <span className="roomDistance">With Air Condition</span>
          <span className="roomPriceHighlight">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="roomImages">
            {data.photos?.map((item, i) => (
              <div className="roomImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={item}
                  alt=""
                  className="roomImg"
                />
              </div>
            ))}
          </div>
          <div className="roomDetails">
            <div className="roomDetailsTexts">
              <h1 className="roomTitle">{data.roomtype} Room</h1>
              <p className="roomDesc">{data.desc}</p>
            </div>
            <div className="roomDetailsPrice">
              <h1>Reserve for {showdaynight} stay?</h1>
              <h2>
                <b>Check Available for</b> ({showdaynight})
              </h2>
              <button onClick={hanldeClick}>
                Check Availability and Payment!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      {openModal && (
        <CheckoutForm
          setOpen={setOpenModal}
          data={data}
          alldates={alldates}
          roomId={id}
          available={available}
        />
      )}
    </div>
  );
};

export default Room;
9;
