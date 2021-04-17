import { useEffect, useRef, useContext, useState } from "react";
import Context from "../context";
import AddRestaurant from "./AddRestaurant";

function Map() {
  const mapRef = useRef();
  const [restaurant, setRestaurant] = useState({});
  const [mapElm, setMapElm] = useState(null);
  const [markers, setMarkers] = useState([]);

  const { dispatch, state } = useContext(Context);

  // Creating the map
  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
      });

      map.addListener("click", (e) => {
        console.log({ e });
      });

      setMapElm(map);
      //Add restaurant coords
      map.addListener("rightclick", (e) => {
        setRestaurant({
          geometry: {
            location: {
              lat: e.latLng.lat,
              lng: e.latLng.lng,
            },
          },
        });
      });
      //users location using coords
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const position = {
          lat: coords.latitude,
          lng: coords.longitude,
        };

        //Recenter the map in current location
        map.setCenter(position);
        const marker = new window.google.maps.Marker({
          position,
          map,
        });
        //showing restaurants nearby
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: position,
            radius: "5000",
            type: ["restaurant"],
          },
          //If
          (results, status) => {
            if (status === "OK") {
              //update global state via dispatch
              dispatch({ action: "UPDATE_RESTAURANTS", payload: results });
            }
          }
        );
      });
    }
  }, [window.google]);

  useEffect(() => {
    markers.map((marker) => {
      marker.setMap(null);
    });

    if (state.filtered.length === 0 && state.filter > 0) {
    } else {
      createMarkers();
    }
  }, [state.restaurants, state.filtered]);

  const addRestaurant = (data) => {
    const newRestaurant = { ...restaurant, ...data };

    //Using dispatch to update global state of restaurants without replacing previous restaurants
    dispatch({
      action: "UPDATE_RESTAURANTS",
      payload: [newRestaurant, ...state.restaurants],
    });

    setRestaurant({});
  };

  //GENERATING MARKERS ON ALL THE NEARBY RESTAURANTS WITH FILTER
  const createMarkers = () => {
    const restaurants =
      state.filtered.length > 0 ? state.filtered : state.restaurants;

    // Looping through all the restaurants
    let markersArr = [];
    restaurants.map((p) => {
      const icon = {
        url: p.icon,
        size: new window.google.maps.Size(70, 70),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25),
      };
      // PLACING MARKERS FOR RESTAURANT LOCATIONS
      const marker = new window.google.maps.Marker({
        position: {
          lat: p.geometry.location.lat(),
          lng: p.geometry.location.lng(),
        },
        icon,
        map: mapElm,
      });

      // WHEN MARKERS ARE CLICKED
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <h3>${p.name}</h3>
          <p>${p.vicinity}</p>
        `,
      });

      marker.addListener("click", (e) => {
        console.log({ e });
        infoWindow.open(mapElm, marker);
      });

      markersArr = [marker, ...markersArr];
    });

    setMarkers(markersArr);
  };

  return (
    <>
      {/*  When has geometry - will create the form  */}
      {restaurant.geometry && (
        <AddRestaurant submit={addRestaurant} close={setRestaurant} />
      )}
      <div ref={mapRef} style={{ height: "calc(100vh - 56px)" }} />
    </>
  );
}
export default Map;
