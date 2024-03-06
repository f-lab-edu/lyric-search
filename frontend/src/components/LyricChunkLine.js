import styles from "./LyricChunkLine.module.css";

function LyricChunkLine({ lyrics, originLang }) {
  const lyricList = Object.values(lyrics);

  return (
    <div>
      {lyricList.map((part, partIndex) => {
        const lineValues = Object.values(part.lines);
        const lyricChunk = lineValues.map((lines, lineIndex) => {
          return (
            <div key={`part-${partIndex}-line-${lineIndex}`}>
              {lines[originLang]}
            </div>
          );
        });

        return (
          <div key={`part-${partIndex}`} className={styles.line}>
            {lyricChunk}
          </div>
        );
      })}
    </div>
  );
}

export default LyricChunkLine;
