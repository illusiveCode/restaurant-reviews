import React from "react";
import Map from "../components/Map";
import Places from "../components/Places";

function Home() {
  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="col-md-9">
          <Map />
        </div>
        <div className="col-md-3">
          <Places />
        </div>
      </div>
    </div>
  );
}

export default Home;
