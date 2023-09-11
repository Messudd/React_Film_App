import "./App.css";
import FilmContainer from "./components/FilmContainer";
import FavListContainer from "./components/FavListContainer";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilmPreview from "./components/FilmPreview";
import DiziDetay from "./components/DiziDetay";
import DiziEkle from "./components/DiziEkle";
import axios from "axios";
import {
  faBackward,
  faForward,
  faHome,
  faArrowUp,
  faArrowDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import TumDiziler from "./components/TumDiziler";

function App() {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(1);
  const [previewFilm, setPreviewFilm] = useState(null);
  const [diziFavla, setDiziFavla] = useState([]);
  const [diziDetay, setDiziDetay] = useState(null);
  const [BigVeri, setBigVeri] = useState([]);
  const [query, setQuery] = useState("");

  const [mode, setMode] = useState(false);
  const MainPageHistory = useHistory();

  const htmlTag = document.getElementById("doc");

  const theme = {
    backgroundColor: mode && "#fff",
    border: mode && "none",
    boxShadow: mode && "0 0 5px #fff",
    marginTop: mode && "60px",
  };
  const theme_two = {
    backgroundColor: mode && "#fff",
    border: mode && "none",
    boxShadow: mode && "0 0 5px #000",
  };
  const theme_three = {
    backgroundColor: mode && "#fff",
    border: mode && "none",
    boxShadow: mode && "0 0 5px #000",
    paddingTop: "5px",
  };

  const htmlBgroundChange = () => {
    if (mode === true) {
      htmlTag.style.backgroundColor = "#fff";
    } else htmlTag.style.backgroundColor = "rgba(0,0,0)";
  };

  htmlBgroundChange();

  const getData = async (num) => {
    const veri = await axios

      .get(`https://www.episodate.com/api/most-popular?page=${num}`)
      .then((responce) => responce.data["tv_shows"])
      .catch((error) => console.log(error));

    setData(veri);
  };

  useEffect(() => {
    getData(counter);
  }, [counter]);

  const getDataAll = async (valuee) => {
    const veriler = await axios

      .get(`https://www.episodate.com/api/most-popular?page=${valuee}`)
      .then((responce) => responce.data["tv_shows"])
      .catch((error) => console.log(error));

    return veriler;
  };

  const detayMethods = async (objectDizi) => {
    const dataDetay = await axios

      .get(`https://www.episodate.com/api/show-details?q=${objectDizi.id}`)
      .then((responce) => responce.data.tvShow)
      .catch((error) => console.log(error));

    setDiziDetay(dataDetay);
  };

  const filmFordwardChange = () => {
    let deger = counter;

    return 1 <= deger && deger < 20 ? getData(setCounter((deger += 1))) : 0;
  };

  const filmBackwardChange = () => {
    let deger = counter;

    return 2 <= deger && deger <= 20 ? getData(setCounter((deger -= 1))) : 0;
  };

  const createPreview = (filmNesne) => {
    setPreviewFilm(filmNesne);
  };

  const favlaMethods = (objectDizi) => {
    if (diziFavla.find((dizi) => dizi.id === objectDizi.id)) {
      alert("Bu dizi zaten favorilerde mevcut ...");
    } else {
      setDiziFavla([...diziFavla, objectDizi]);
      MainPageHistory.push("/");
      // alert("Favorilere - Eklendi :)");
    }
  };
  const favlaMethodsTwo = (objectDizi, param) => {
    if (diziFavla.find((dizi) => dizi.id === objectDizi.id)) {
      alert("Bu dizi zaten favorilerde mevcut ...");
    } else {
      setDiziFavla([...diziFavla, objectDizi]);
      console.log("secilen eleman :", param);
      setTimeout(() => {
        param.style.display = "block";
        param.textContent = "Dizi Favorilere Eklendi :)";
      }, 100);
    }
  };

  function favCikar(fav_nesne) {
    const favDizi = [...diziFavla];

    for (let i in favDizi) {
      if (favDizi[i].id === fav_nesne.id) {
        favDizi.splice(i, 1);
      }
    }
    setDiziFavla(favDizi);
  }

  const getAllPageData = async () => {
    const all_page = [];
    for (let i = 1; i <= 20; i++) {
      all_page.push(await getDataAll(i));
    }
    setBigVeri(all_page);
  };

  const search = (allveri) => {
    const alldata_obj = [];
    for (let i in allveri) {
      for (let k in allveri[i]) {
        alldata_obj.push(allveri[i][k]);
      }
    }
    return alldata_obj;
  };

  const modeChange = () => {
    setMode(!mode);
  };

  useEffect(() => {
    console.log("responce-data :", data);
  }, [data]);

  useEffect(() => {
    console.log("number son degeri : ", counter);
  }, [counter]);

  useEffect(() => {
    console.log("favlanan - dizi :", diziFavla);
  }, [diziFavla]);

  useEffect(() => {
    console.log("All_Page_Data : ", BigVeri);
  }, [BigVeri]);

  useEffect(() => {
    console.log("dizi-detay : ", diziDetay);
  }, [diziDetay]);

  return (
    <div style={{ backgroundColor: mode && "#fff" }}>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <div
              className="kutu"
              style={{
                backgroundColor: mode && "#d2d2d2",
                borderRadius: mode && "15px",
              }}
            >
              <Link
                to="/Tum-Diziler"
                style={{ position: "absolute", left: "5px", top: 0 }}
              >
                <button
                  onClick={getAllPageData}
                  className="allFilm_btn"
                  style={{
                    backgroundColor: mode && "#fff",
                    border: mode && "1px solid #202020",
                  }}
                >
                  Tüm - Diziler
                </button>
              </Link>
              <Link to="/">
                <div>
                  <FontAwesomeIcon
                    style={{ color: mode && "#202020" }}
                    icon={faHome}
                  ></FontAwesomeIcon>
                </div>
              </Link>
              <h1>
                <span style={{ color: mode && "#202020" }}>FAVORİ DİZİNİ </span>{" "}
                ~ SEÇ<span style={{ color: mode && "#202020" }}> :)</span>
              </h1>
              <a style={{ color: "whitesmoke" }} href="#head-page">
                <FontAwesomeIcon
                  style={{ color: mode && "#202020" }}
                  icon={faArrowUp}
                ></FontAwesomeIcon>
              </a>
              <a
                style={{
                  color: "whitesmoke",
                  paddingTop: "4px",
                  marginLeft: "10px",
                }}
                href="#fav_git"
              >
                <FontAwesomeIcon
                  style={{ color: mode && "#202020" }}
                  icon={faArrowDown}
                ></FontAwesomeIcon>
              </a>
              <h2 style={{ position: "absolute", right: "80px" }}>Mode</h2>
              <label className="switch">
                <input type="checkbox" onChange={modeChange} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="main_container">
              <div className="filmListContainer" style={theme}>
                {data.map((dizi) => (
                  <FilmContainer
                    key={dizi.id}
                    filmName={dizi.name}
                    film_src={dizi.image_thumbnail_path}
                    startDate={dizi.start_date}
                    btn_preview="İncele"
                    film={dizi}
                    createPreview={createPreview}
                    mode={mode}
                  />
                ))}
              </div>
              <div className="filmChangeList" style={theme_two}>
                <Link to="/Dizi-ekle">
                  <button
                    style={{
                      backgroundColor: mode && "#fff",
                      border: mode && "1px solid #202020",
                    }}
                    className="addFilm"
                  >
                    Favori Dizi Ekle
                  </button>
                </Link>
                <div onClick={() => filmBackwardChange()}>
                  <FontAwesomeIcon
                    style={{ color: mode && "#202020" }}
                    icon={faBackward}
                  ></FontAwesomeIcon>
                </div>
                <span
                  style={{
                    color: mode && "#202020",
                    fontWeight: mode && "bold",
                  }}
                >
                  {counter}
                </span>
                <div onClick={() => filmFordwardChange()}>
                  <FontAwesomeIcon
                    style={{ color: mode && "#202020" }}
                    icon={faForward}
                  ></FontAwesomeIcon>
                </div>
              </div>
              <div className="mainContent" style={theme_two}>
                {previewFilm ? (
                  <FilmPreview
                    favlaMethods={favlaMethods}
                    detayMethods={detayMethods}
                    diziObject={previewFilm}
                    mode={mode}
                  ></FilmPreview>
                ) : (
                  <div
                    className="non_content "
                    style={{ color: mode && "#202020" }}
                  >
                    İncelenen herhangi bir dizi yoq{" "}
                    <span role="img" style={{ fontSize: "22px" }}>
                      {" "}
                      😕
                    </span>
                  </div>
                )}
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: mode ? "#000" : "whitesmoke",
                  letterSpacing: "0.1rem",
                }}
              >
                Favori Dizilerim
                <span style={{ fontSize: "22px", marginLeft: "5px" }}>👍</span>
              </h2>
              <div className="favoriteFilmListContainer" style={theme_three}>
                {diziFavla.map((content) => (
                  <FavListContainer
                    key={content.id}
                    filmNameInfo={content.name}
                    film_source={content.image_thumbnail_path}
                    favCikar={favCikar}
                    favNesne={content}
                    createPreview={createPreview}
                    mode={mode}
                  ></FavListContainer>
                ))}
              </div>
            </div>
          </div>
        </Route>
        <Route path="/Dizi-ekle">
          <div
            className="kutu"
            style={{
              backgroundColor: mode && "whitesmoke",
              border: mode && "1px solid transparent",
              borderRadius: mode && "15px",
              boxShadow: mode && "0 0 5px #000",
              marginTop: "8px",
            }}
          >
            <Link to="/">
              <div>
                <FontAwesomeIcon
                  style={{ color: mode && "#000" }}
                  icon={faHome}
                ></FontAwesomeIcon>
              </div>
            </Link>
            <h1>
              <span style={{ color: mode && "#000" }}>FAVORİ DİZİNİ </span> ~
              SEÇ<span style={{ color: mode && "#000" }}> :)</span>
            </h1>
          </div>
          <DiziEkle favlaMethods={favlaMethods} mode={mode}></DiziEkle>
        </Route>
        <Route path="/dizi-detay/">
          {diziDetay ? (
            <DiziDetay
              detayDizisi={diziDetay}
              favlaMethods={favlaMethodsTwo}
              mode={mode}
            ></DiziDetay>
          ) : (
            0
          )}
        </Route>
        <Route path="/Tum-Diziler">
          <div className="all_content_container">
            <div className="searchbar" id="search_bar">
              <Link to="/">
                <FontAwesomeIcon
                  style={{ color: mode ? "#000" : "darkorange" }}
                  icon={faHome}
                ></FontAwesomeIcon>
              </Link>
              <label>
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    color: mode ? "#000" : "darkorange",
                    cursor: "pointer",
                  }}
                ></FontAwesomeIcon>
                <div
                  className="inDiv"
                  style={{
                    backgroundColor: mode && "#000",
                    border: mode && "5px solid #000",
                  }}
                >
                  {" "}
                  <input
                    type="text"
                    placeholder=" Ara"
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                      backgroundColor: mode && "whitesmoke",
                      color: mode && "#000",
                    }}
                  />
                </div>
              </label>
            </div>
            <div className="tum_dizi_container">
              {search(BigVeri)
                .filter(
                  (data) =>
                    data.name.toLowerCase().includes(query) ||
                    data.name.toUpperCase().includes(query)
                )
                .map((veri) => (
                  <TumDiziler
                    key={veri.id}
                    veriName={veri.name}
                    veri_src={veri.image_thumbnail_path}
                    veri_startDate={veri.start_date}
                    veriFavla={favlaMethods}
                    veriNesnesi={veri}
                    set_query={setQuery}
                    mode={mode}
                  />
                ))}
            </div>
          </div>
          <div className="upPage">
            <a href="#search_bar">
              <FontAwesomeIcon
                icon={faArrowUp}
                style={{
                  color: mode ? "#000" : "darkorange",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              ></FontAwesomeIcon>
            </a>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
