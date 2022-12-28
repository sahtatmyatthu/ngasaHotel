import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Reserve = () => {
  const { data, loading, error } = useFetch(
    `/api/rooms/find/${roomId}`
  );

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

  //const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = function () {
    let fromdb = [];
    data.reserve?.map((i) => {
      fromdb.push(i.unavailableDates);
    });
    let changetodate = [];
    fromdb.flat().map((i) => changetodate.push(new Date(i).getTime()));

    // let result = alldates.filter((date) => !changetodate.includes(date));

    return null;
  };

  let a = isAvailable();
  console.log("is available", a);
  const handleClick = async () => {
    try {
      const res = axios.put(
        `/rooms/availability/${roomId}`,
        {
          reserve: [{ user: user.username, unavailableDates: alldates }],
        }
      );
      return res.data;
    } catch (err) {}
  };

  const handleCancel = async () => {
    try {
      const res = axios.put(
        `/rooms/availability/${roomId}`,
        {
          reserve: [],
        }
      );
      return res.data;
    } catch (err) {}
  };
  const showReserve = function () {
    // return isAvailable().length> 0? isAvailable().map((date) => new Date(date).toLocaleDateString()).join(", "):" RESERVED";
  };
  // console.log(showReserve())

  return (
    <div className="rContainer">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="rClose"
        onClick={() => setOpen(false)}
      />
      <h1><FontAwesomeIcon icon={faCalendarCheck} style={{color:"#0071c2",marginRight:"5px"}}/>Reserve</h1>
      <div className="itemContainer">
        <div className="reserveItem">
          <label className="rLabel">Name</label>
          <span className="rSpan"></span>
        </div>
        <div className="reserveItem">
          <label className="rLabel">Reserve Room</label>
          <span className="rSpan"></span>
        </div>
        <div className="reserveItem">
          <label className="rLabel">Room Type</label>
          <span className="rSpan"></span>
        </div>
        <label className="rLabel">Reserve Date</label>
        <label className="rLabel">Sat Dec 17 2022  </label>
      </div>

      <button onClick={handleClick} className="rButton">
        Reserve Now!
      </button>
    </div>
  );
};

export default Reserve;
