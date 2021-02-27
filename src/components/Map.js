import { useEffect, useRef, useContext } from "react";
import Context from "../context";

function Map() {
  const mapRef = useRef();

  const { dispatch } = useContext(Context);
  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
      });
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const position = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        map.setCenter(position);
        const marker = new window.google.maps.Marker({
          position,
          map,
        });
        console.log(position);

        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: position,
            radius: "5000",
            type: ["restaurant"],
          },
          (results, status) => {
            if (status === "OK") {
              dispatch({ action: "UPDATE_RESTAURANTS", payload: results });
            }
          }
        );
      });
    }
  }, [window.google]);
  return <div ref={mapRef} style={{ height: "100vh" }} />;
}
console.log("hello");
export default Map;
