import React from "react";

const FilmContainer = (props) => {
  const {
    film_src,
    btn_preview,
    filmName,
    startDate,
    createPreview,
    film,
    mode,
  } = props;

  const tema = {
    backgroundColor: mode && "#ffff",
    border: mode && "1px solid transparent",
    boxShadow: mode && "0 0 5px #000",
  };

  const tema_btn = {
    backgroundColor: mode && "whitesmoke",
    color: mode && "#000",
    border: mode && "1px solid transparent",
  };

  return (
    <div id="head-page" className="filmContainer" style={tema}>
      <div>
        <img src={film_src} alt=" Film Görseli :)"></img>
      </div>
      <div className="filmContent">
        <h2 style={{ color: mode && "#000" }}>{filmName}</h2>
        <p style={{ color: mode && "#000" }}>{startDate}</p>
        <a href="#preview">
          <button
            style={tema_btn}
            className="incele_btn"
            onClick={() => {
              createPreview(film);
            }}
          >
            {btn_preview}
          </button>
        </a>
      </div>
    </div>
  );
};

export default FilmContainer;
