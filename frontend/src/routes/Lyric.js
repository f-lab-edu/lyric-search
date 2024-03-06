import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReturnButton from "../components/ReturnButton";
import LyricDetail from "../components/LyricDetail";

function Lyric() {
  const [lyricData, setLyricData] = useState({});
  const { id } = useParams();

  const getLyric = async () => {
    const json = await fetch(`http://localhost:8080/lyric/${id}`)
      .then((res) => res.json())
      .then((json) => json.data[0])
      .catch((error) => console.log("Error", error));

    setLyricData(json);
  };

  useEffect(() => {
    getLyric();
  }, []);

  return (
    <div>
      <ReturnButton />
      <div>
        <LyricDetail data={lyricData} />
      </div>
    </div>
  );
}

export default Lyric;
