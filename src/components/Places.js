import { useContext } from "react";
import Context from "../context";

function Places() {
  const { state } = useContext(Context);
  console.log({ state });
  return (
    <div>
      <h2>Nearby Restaurants</h2>
      <ul className="list-group">
        {state.restaurants.map((r) => (
          <li className="list-group-item">
            <strong>{r.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Places;
