import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const FilmPreview = (props) => {
  const { diziObject, favlaMethods, detayMethods, mode } = props;

  const preview_theme = {
    backgroundColor: mode && "whitesmoke",
    border: mode && "1px solid #000",
  };

  return (
    <div id="preview" style={preview_theme}>
      <div className="preview_img">
        <img src={diziObject.image_thumbnail_path} alt="Film_Öngürünüm"></img>
      </div>
      <div className="preview_content">
        <h2 style={{ color: mode && "#000" }}>{diziObject.name}</h2>
        <p style={{ color: mode && "#000" }}>Date : {diziObject.start_date}</p>
        <div className="dual_btn">
          <Link to={`/dizi-detay/:` + diziObject.id}>
            <button
              className="detay"
              onClick={() => {
                detayMethods(diziObject);
              }}
            >
              detay
            </button>
          </Link>
          <a href="#fav_git">
            <button
              className="favla"
              onClick={() => {
                favlaMethods(diziObject);
              }}
            >
              favla
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilmPreview;

// className="favla" onClick={()=> {favlaMethods(diziObj)}}

// favlaMethods,diziObj
