import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const FavListContainer = (props) => {
  const { filmNameInfo, film_source, favCikar, favNesne, createPreview, mode } = props;
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const iconStyle = {
    color: "whitesmoke",
    width: "12px",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "3px 7px",
    cursor: "pointer",
    marginTop: "4px",
    filter: isHover ? "brightness(100%)" : "brightness(60%)",
    border: "1px solid darkorange",
    borderRadius: "20px",
    backgroundColor: "darkorange",
  };
  return (
    <div id="fav_git" className="filmContainer_fav">
      <div
        onClick={() => {
          createPreview(favNesne);
        }}
      >
        <img src={film_source} alt=" Film Görseli :)"></img>
      </div>
      <div className="filmContent_fav">
        <h2 style={{ color: mode && "#000" }}>{filmNameInfo}</h2>
        <FontAwesomeIcon
          style={iconStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          icon={faXmark}
          onClick={() => favCikar(favNesne)}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default FavListContainer;
