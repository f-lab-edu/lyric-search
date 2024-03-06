import styles from "./LyricDetail.module.css";
import LyricChunk from "./LyricChunk";

function LyricDetail({ data }) {
  if (Object.entries(data).length === 0) {
    console.log("Loading data...");
  } else {
    console.log("Data load complete.");

    return (
      <div data-id={data.id} className={styles.lyricDetail}>
        <div className={styles.lyricInfoTop}>
          <div className={styles.lyricInfo}>
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
          </div>

          <div>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${data.youtubeId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className={styles.lyricContents}>
          <div>
            <LyricChunk data={data} />
          </div>
        </div>
      </div>
    );
  }
}

export default LyricDetail;
