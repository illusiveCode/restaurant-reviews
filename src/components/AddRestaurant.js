import { useState } from "react";
import StarRatings from "react-star-ratings";

function AddRestaurant({ submit, close }) {
  const [data, setData] = useState({
    icon:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    name: "",
    vicinity: "",
  });

  const handleChange = (e) => {
    if (e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
    } else {
      setData({ ...data, rating: e });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(data);
  };

  return (
    <div className="modal-form">
      <div className="shadow">
        <button onClick={() => close({})} className="btn btn-danger btn-small">
          &times;
        </button>
        <h2 className="display-4 text-center">New restaurant</h2>

        <form onSubmit={handleSubmit} className=" p-4">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              onChange={handleChange}
              value={data.name}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="text">Comments</label>
            <textarea
              id="text"
              name="text"
              className="form-control"
              onChange={handleChange}
              value={data.text}
            />
          </div>
          <div className="mb-4">
            <StarRatings
              rating={data.rating}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              changeRating={handleChange}
              starDimension="18px"
              starSpacing="3px"
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddRestaurant;
