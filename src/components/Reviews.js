import StarRatings from "react-star-ratings";

function Reviews({ reviews, children }) {
  return (
    <div>
      <div className="my-5 text-center">
        <h2 className="display-4">Reviews</h2>
        {children}
      </div>

      <div className="row">
        {reviews?.map((r) => (
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="text-center my-4">
                  <img src={r.profile_photo_url} alt={r.author_name} />
                </div>
                <h5 className="card-title text-center">{r.author_name}</h5>
                <hr />
                <p>{r.text}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <StarRatings
                  rating={r.rating}
                  starRatedColor="orange"
                  numberOfStars={5}
                  name="rating"
                  starDimension="18px"
                  starSpacing="3px"
                />
                <small>{r.relative_time_description}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
