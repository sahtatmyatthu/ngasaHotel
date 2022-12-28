import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import ReactPaginate from "react-paginate";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [room, setRoom] = useState(location.state.room);
  const [startDate, setStartDate] = useState(
    new Date(location.state.startDate).toLocaleDateString()
  );
  const [endDate, setEndDate] = useState(
    new Date(location.state.endDate).toLocaleDateString()
  );
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  console.log(startDate, endDate)
  let url = undefined;
  destination === "All"
    ? (url = `/api/rooms?&min=${min || 0}&max=${
        max || 999
      }`)
    : (url = `/api/rooms?roomtype=${destination}&min=${
        min || 0
      }&max=${max || 999}`);

  const { data, loading, error, reFetch } = useFetch(url);

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

  const displayedItem = data
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <SearchItem
          item={item}
          key={item._id}
          destination={destination}
          startDate={startDate}
          endDate={endDate}
          options={options}
        />
      );
    });

  const pageCount = Math.ceil(data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleClick = () => {
    reFetch();
  };
  return (
    <>
      <div>
        <Navbar />
        <Header type="list" />
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input type="text" placeholder={destination} />
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>
                  {" "}
                  {startDate} to {endDate}
                </span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                    className="date"
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    min={0}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    min={0}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input type="number" min={1} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" min={0} className="lsOptionInput" />
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
            <div className="listResult">
              {loading ? "loading" : <>{displayedItem}</>}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttns"}
          nextLinkClassName={"nextBttns"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
};

export default List;
