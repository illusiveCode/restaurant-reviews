import StarRatings from "react-star-ratings";
import { useContext } from "react";
import Context from "../context";
import { Link } from "react-router-dom";

function Places() {
  const { state } = useContext(Context);

  console.log(state);

  const restaurants =
    state.filtered.length > 0 ? state.filtered : state.restaurants;

  return (
    <div>
      <h2 className="nearby m-3">Nearby Restaurants</h2>
      {state.filtered.length === 0 && state.filter > 0 ? (
        <div className="mx-3 alert alert-warning">Nothing found</div>
      ) : (
        <ul className="list-group">
          {restaurants.map((r, key) => (
            <li key={key} className="list-group-item">
              <Link to={`/${r.place_id}`}>
                <strong>{r.name}</strong>
                <div>
                  <StarRatings
                    rating={r.rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    starDimension="18px"
                    starSpacing="3px"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Places;
