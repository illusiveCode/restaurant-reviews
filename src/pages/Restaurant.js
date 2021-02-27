import React, { useEffect, useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";

function Restaurant(props) {
  const mapRef = useRef();
  const [restaurant, setRestaurant] = useState({});
  const [review, setReview] = useState({});

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
    });
    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails(
      { placeId: props.match.params.placeId },
      (place, status) => {
        console.log({ place, status });
        if (status === "OK") {
          setRestaurant(place);
        }
      }
    );
  }, []);

  console.log({ review });

  const submit = (data) => {
    const newReview = { ...review, ...data };
    setRestaurant({
      ...restaurant,
      reviews: [newReview, ...restaurant.reviews],
    });
  };

  return (
    <div className="container">
      <div ref={mapRef} />
      <h1>{restaurant.name}</h1>

      {review.time && <AddReview submit={submit} />}
      <Reviews reviews={restaurant.reviews}>
        <button
          onClick={() => setReview({ time: new Date().getTime() })}
          className="btn btn-primary"
        >
          Write Review
        </button>
      </Reviews>
    </div>
  );
}

export default Restaurant;
