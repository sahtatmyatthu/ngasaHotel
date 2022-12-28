import "./header.css";
import { useContext, useState } from "react";
import {
  faBed,
  faCalendarDays,
  faCar,
  faContactBook,
  faLocation,
  faPerson,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import { useDispatch } from "react-redux";
import { setNewSearch } from "../../features/searchSlice";

const Header = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const startDate = dates[0].startDate.getTime();
  const endDate = dates[0].endDate.getTime();

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    setDates(false);
    setOptions(false);
    dispatch(setNewSearch(destination, startDate, endDate, options));
    navigate("/rooms", { state: { destination, startDate, endDate, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxi</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faLocation} />
            <span>Location</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faContactBook} />
            <span>Contact</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Welcome to Hotel Pyin Oo Lwin</h1>
            <p className="headerDesc">
              Located in the Pyin Oo Lwin city center, we offer a sophisticated
              blend of contemporary Burmese style, contemporary comfort and
              privileged services.
            </p>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <select
                  className="headerSearchText"
                  name=""
                  id=""
                  onClick={(e) => setDestination(e.target.value)}
                >
                  <option value=""></option>
                  <option className="optionSearch" value="All">
                    All rooms{" "}
                  </option>
                  <option className="optionSearch" value="Single">
                    Single Rooms{" "}
                  </option>
                  <option className="optionSearch" value="Double">
                    Double Rooms{" "}
                  </option>
                  <option className="optionSearch" value="Studio">
                    Studio Rooms
                  </option>
                  <option className="optionSearch" value="View">
                    View Rooms{" "}
                  </option>
                  <option className="optionSearch" value="Suites">
                    Suites
                  </option>
                </select>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate) & setOpenOptions(false)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() =>
                    setOpenOptions(!openOptions) & setOpenDate(false)
                  }
                  className="headerSearchText"
                >{`${options.adult} adult . ${options.children} children .${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          onClick={() => handleOption("adult", "d")}
                          className="optionCounterButton"
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          onClick={() => handleOption("adult", "i")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          onClick={() => handleOption("children", "i")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          onClick={() => handleOption("room", "d")}
                          className="optionCounterButton"
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          onClick={() => handleOption("room", "i")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button
                  className="headerBtn"
                  disabled={destination === ""} //|| user ===null
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
