import "./../theme/dizi_icerik.css";

const TumDiziler = (props) => {
  const {
    veriName,
    veri_src,
    veri_startDate,
    veriFavla,
    veriNesnesi,
    set_query,
    mode,
  } = props;

  const style_box = {
    backgroundColor: mode && "whitesmoke",
    border: mode && "1px solid transparent",
    boxShadow: mode && "0 0 5px #000",
    borderRight: mode && "10px solid #000",
  };

  return (
    <div className="dizi_box" style={style_box}>
      <div className="dizi_img">
        <img src={veri_src} alt="Diziye ait görsel" />
      </div>
      <div className="dizi_icerik">
        <h2 style={{ color: mode && "#000" }}>{veriName}</h2>
        <p style={{ color: mode && "#000" }}>{veri_startDate}</p>
        <div className="btns_all_dizi" onClick={() => set_query("")}>
          <button onClick={() => veriFavla(veriNesnesi)}>Favoriye Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default TumDiziler;
