import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./../theme/diziEkle.css";

const DiziEkle = (props) => {
  const { favlaMethods, mode } = props;

  const [formDiziname, setFormDiziName] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formdate, setFormdate] = useState("");
  const [formId, setFormId] = useState("");
  const [isNameLength, setIsNameLength] = useState(false);
  const [isUrlLength, setIsUrlLength] = useState(false);
  const [isDateLength, setIsDateLength] = useState(false);
  const [isIdLength, setIsIdLength] = useState(false);
  const [formData, setFormData] = useState(null);

  const style_add = {
    backgroundColor: mode && "whitesmoke",
    border: mode && "1px solid transparent",
    boxShadow: mode && "0 0 5px #000",
    borderRight: mode && "8px solid #000",
    borderLeft: mode && "8px solid #000",
  };
  const style_input = {
    backgroundColor: mode && "whitesmoke",
    color: mode && "#000",
  };

  const createFavObj = (fDiziname, fUrl, fdate, fID) => {
    const newObj = {
      id: fID, // Math.random() * 10000 + 500, // Date.noW()
      name: fDiziname,
      image_thumbnail_path: fUrl,
      start_date: fdate,
    };
    setFormData(newObj);
    return formData;
  };

  const history = useHistory();

  const handleChangeName = (e) => {
    if (formDiziname.length > 4) {
      setIsNameLength(false);
    } else {
      setIsNameLength(true);
    }
    setFormDiziName(e.target.value);
  };

  const handleChangeId = (e) => {
    if (formId.length > 10) {
      setIsIdLength(false);
    } else {
      setIsIdLength(true);
    }
    setFormId(e.target.value);
  };

  const handleChangeUrl = (e) => {
    if (formUrl.length > 30) {
      setIsUrlLength(false);
    } else {
      setIsUrlLength(true);
    }
    setFormUrl(e.target.value);
  };

  const handleChangeDate = (e) => {
    if (formdate.length > 8) {
      setIsDateLength(false);
    } else {
      setIsDateLength(true);
    }
    setFormdate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    favlaMethods(formData);
    history.push("/");
  };

  console.log("dizi_adı :", formDiziname);
  console.log("dizi-url :", formUrl);
  console.log("yeni_nesne :", formData);
  console.log(isNameLength, isUrlLength, isDateLength);

  return (
    <div className="diziekle-container" style={style_add}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          fontStyle: "italic",
          color: mode && "#000",
        }}
      >
        DİZİ - EKLE
      </h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="form_name"
              style={style_input}
              type="text"
              name="name"
              placeholder="Dizi adı..."
              onChange={handleChangeName}
            ></input>
            {isNameLength ? (
              <span
                style={{
                  textAlign: "end",
                  color: "red",
                  filter: "birightness(150%) ",
                  display: "block",
                  fontSize: "12px",
                  paddingLeft: "3px",
                }}
              >
                en az 5 karakter !
              </span>
            ) : null}
            <hr style={{ color: mode && "#000" }} />
          </label>
          <label>
            <input
              className="form_ID"
              style={style_input}
              type="text"
              name="name"
              placeholder="ID giriniz..."
              onChange={handleChangeId}
            ></input>
            {isIdLength ? (
              <span
                style={{
                  textAlign: "end",
                  color: "red",
                  filter: "birightness(150%) ",
                  display: "block",
                  fontSize: "12px",
                  paddingLeft: "3px",
                }}
              >
                Uniqe bir Id giriniz ! (en az 10 karakter)
              </span>
            ) : null}
            <hr style={{ color: mode && "#000" }} />
          </label>
          <label>
            {" "}
            <input
              className="form_url"
              style={style_input}
              type="text"
              name="image_thumbnail_path"
              placeholder="Dizi url... "
              onChange={handleChangeUrl}
            ></input>
            {isUrlLength ? (
              <span
                style={{
                  color: "red",
                  textAlign: "end",
                  filter: "birightness(150%) ",
                  display: "block",
                  fontSize: "12px",
                  paddingLeft: "3px",
                }}
              >
                Url gerekli !
              </span>
            ) : null}
            <hr style={{ color: mode && "#000" }} />
          </label>

          <label>
            {" "}
            <input
              className="form_date"
              style={style_input}
              type="text"
              name="start_date"
              placeholder="Dizi tarihi -> 01.01.2001 "
              onChange={handleChangeDate}
            ></input>
            {isDateLength ? (
              <span
                style={{
                  color: "red",
                  textAlign: "end",
                  filter: "birightness(150%) ",
                  display: "block",
                  fontSize: "12px",
                  paddingLeft: "3px",
                }}
              >
                Nokta - formatta giriniz !
              </span>
            ) : null}
            <hr style={{ color: mode && "#000" }} />
          </label>

          <button
            type="submit"
            onClick={() =>
              createFavObj(formDiziname, formUrl, formdate, formId)
            }
            disabled={
              formDiziname.length > 4 &&
              formUrl.length > 30 &&
              formdate.length > 8 &&
              formId.length > 9
                ? false
                : true
            }
          >
            Ekle
          </button>
        </form>
        <div className="form-footer">
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              style={{
                marginTop: "30px",
                color: mode ? "#000" : "darkorange",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              icon={faArrowLeft}
            ></FontAwesomeIcon>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DiziEkle;
