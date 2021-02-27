import { useState } from "react";
import StarRatings from "react-star-ratings";

function AddReview({ submit }) {
  const [data, setData] = useState({ author_name: "", text: "" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  console.log({ data });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(data);
  };

  return (
    <div className="row my-5">
      <h2 className="display-4 text-center">Adding a new review</h2>

      <div className="col-md-3 mx-auto">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">{data.author_name}</h5>
            <hr />
            <p>{data.text}</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <StarRatings
              rating={5}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              starDimension="18px"
              starSpacing="3px"
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="shadow p-4">
        <div className="form-group">
          <label htmlFor="authorName">Author Name</label>
          <input
            type="text"
            id="authorName"
            name="author_name"
            className="form-control"
            onChange={handleChange}
            value={data.author_name}
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
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default AddReview;
