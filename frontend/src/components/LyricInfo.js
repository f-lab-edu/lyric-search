import styles from "./LyricInfo.module.css";
import { Link } from "react-router-dom";

function LyricInfo({ data }) {
  return (
    <div data-id={data.id} className={styles.song}>
      <Link to={`/lyric/${data.id}`} className={styles.card}>
        <div className={styles.album_image}>
          <img src={data.cover} />
        </div>
        <div className={styles.card_info}>
          <h2>{data.title}</h2>
          <h3>{data.artist}</h3>
          <p>Year: {data.year}</p>
          <p>Country: {data.country}</p>
          <p>Language: {data.language}</p>
        </div>
      </Link>
    </div>
  );
}

export default LyricInfo;
