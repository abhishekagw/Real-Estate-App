import React, { useContext } from "react";
import "../homePage/HomePage.scss";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";

const HomePage = () => {

  const {currentUser} = useContext(AuthContext)

  
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Your Real Estate & Get Your Dream Place
          </h1>
          <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Placerat amet iaculis venenatis magna vulputate hac imperdiet tempor augue.
          </p>
          <SearchBar/>
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Year of experiences</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default HomePage;
