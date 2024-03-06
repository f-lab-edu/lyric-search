import { useState, useEffect } from "react";
import LyricInfo from "../components/LyricInfo";

function Home() {
  const [keyword, setKeyword] = useState("");
  const [lyricData, setLyricData] = useState([]);

  const onChange = (event) => {
    setKeyword(event.target.value);
  };

  const onClick = async () => {
    if (keyword !== "" && keyword.length > 1) {
      await fetch("http://localhost:8080/lyric", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: keyword,
        }),
      })
        .then((res) => res.json())
        .then((data) => setLyricData(data.results))
        .catch((error) => console.log("Error", error));
    }
  };

  return (
    <div>
      <h1>Lyric Search!</h1>

      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="search.."
      ></input>
      <button onClick={onClick}>SEARCH</button>

      <div>
        {lyricData.map((data, index) => (
          <LyricInfo key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Home;
