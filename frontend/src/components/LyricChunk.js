import styles from "./LyricChunk.module.css";
import LyricChunkLine from "./LyricChunkLine";

function LyricChunk({ data }) {
  const originLang = data.language;
  const lyrics = data.lyrics;

  return (
    <div>
      <LyricChunkLine lyrics={lyrics} originLang={originLang} />
    </div>
  );
}

export default LyricChunk;
