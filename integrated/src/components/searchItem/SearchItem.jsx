import "./searchItem.css";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ item, destination, startDate, endDate, options }) => {
  const firstExample = {
    count: 3,
    size: 25,
    value: 2.5,
    edit: false,
  };

  const navigate = useNavigate();
  const handleSingle = () => {
    navigate(`/rooms/${item._id|| item.room_id}`, {
      state: { destination, startDate, endDate, options },
    });
  };
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">Room No.{item.roomnumber}</h1>
        <h2 className="siTitle">{item.roomtype}</h2>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">With Air conditioning</span>
        <span className="siFeatures">
          Entire Room • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <ReactStars className="star" {...firstExample} />
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{item.price}$</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button onClick={handleSingle} className="siCheckButton">
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
