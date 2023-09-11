import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./../theme/diziDetay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DiziDetay = (props) => {
  const { detayDizisi, favlaMethods, mode } = props;

  const style_detay = {
    backgroundColor: mode && "whitesmoke",
    border: mode && "1px solid transparent",
    boxShadow: mode && "0 0 5px #000",
  };

  return (
    <div>
      <div className="detay_container" style={style_detay}>
        <div className="detay-dizi">
          <div className="detay-img">
            <img src={detayDizisi.image_thumbnail_path} alt="Dizi-Detayı"></img>
          </div>
          <div className="dizi-detay-content">
            <h2 style={{ color: mode && "#000" }}>{detayDizisi.name}</h2>
            <p style={{ color: mode && "#000" }}>
              {detayDizisi.rating +
                " " +
                detayDizisi.country +
                " " +
                detayDizisi.status}
            </p>
            <p style={{ color: mode && "#000" }} className="description">
              {detayDizisi.description}
            </p>
            <div className="detay_btns">
              <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  style={{
                    color: mode ? '#000' : 'whitesmoke',
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginTop: "8px",
                  }}
                  icon={faArrowLeft}
                ></FontAwesomeIcon>
              </Link>
              <button
                style={{
                  backgroundColor: mode && "whitesmoke",
                  border: mode && "2px solid darkorange",
                  color: mode && "#000",
                }}
                className="favla-btn"
                onClick={() =>
                  favlaMethods(detayDizisi, document.querySelector(".info_fav"))
                }
              >
                Favla
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="info_fav"></div>
    </div>
  );
};

export default DiziDetay;
