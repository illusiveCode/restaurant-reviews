import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useContext } from "react";
import Context from "../context";

function Header() {
  const { dispatch, state } = useContext(Context);

  const handleChange = (filter) => {
    const filtered = state.restaurants.filter(
      (r) => Math.floor(r.rating) === filter
    );
    dispatch({ action: "FILTER_RESTAURANTS", payload: { filtered, filter } });
  };

  const clearFilters = () => {
    dispatch({ action: "CLEAR_FILTERS" });
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Restaurant Reviews
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <div className="ms-auto">
            <span className="text-white me-3">Rating Filter</span>
            <StarRatings
              rating={state.filter}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              changeRating={handleChange}
              starDimension="18px"
              starSpacing="3px"
            />
            <button
              onClick={clearFilters}
              className={`ms-3 btn btn-sm btn-danger ${
                state.filter === 0 ? "disabled" : ""
              }`}
              disabled={state.filter === 0 ? true : false}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
