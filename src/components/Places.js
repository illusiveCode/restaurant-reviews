import StarRatings from "react-star-ratings";
import { useContext } from "react";
import Context from "../context";
import { Link } from "react-router-dom";

function Places() {
  const { state } = useContext(Context);
  console.log({ state });

  return (
    <div>
      <h2 className="nearby">Nearby Restaurants</h2>
      <ul className="list-group">
        {state.restaurants.map((r) => (
          <li className="list-group-item">
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
    </div>
  );
}

export default Places;
