import React, { useEffect, useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";

function Restaurant(props) {
  const mapRef = useRef();
  const [restaurant, setRestaurant] = useState({});
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {});
    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails(
      { placeId: props.match.params.placeId },
      (place, status) => {
        console.log({ place, status });
        if (status === "OK") {
          setRestaurant(place);
          setLoading(false);
        }
      }
    );
  }, []);

  const submit = (data) => {
    const newReview = { ...review, ...data };
    setRestaurant({
      ...restaurant,
      reviews: [newReview, ...restaurant.reviews],
    });
  };

  return (
    <div className="container restaurant">
      <div ref={mapRef} />
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <header>
            <div className="gallery">
              {restaurant.photos?.map((p) => (
                <img src={p.getUrl()} alt="" />
              ))}
            </div>
            <div>
              {restaurant.photos && (
                <img
                  className="hero-img"
                  src={restaurant.photos[0].getUrl()}
                  alt={restaurant.name}
                />
              )}
              <h1>{restaurant.name}</h1>
              <p>{restaurant.vicinity}</p>
              <p>{restaurant.international_phone_number}</p>
              <p>{}</p>
              <StarRatings
                rating={restaurant.rating}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="18px"
                starSpacing="3px"
              />
              <div className="address">
                {restaurant.address_components?.map((a) => (
                  <p>{a.type}</p>
                ))}
              </div>
            </div>
          </header>

          {review.time && <AddReview submit={submit} close={setReview} />}
          <Reviews reviews={restaurant.reviews}>
            <button
              onClick={() => setReview({ time: new Date().getTime() })}
              className="btn btn-primary"
            >
              Write Review
            </button>
          </Reviews>
        </>
      )}
    </div>
  );
}

export default Restaurant;
