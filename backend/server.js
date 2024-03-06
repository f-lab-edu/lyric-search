import lyricManager from "./lyricManager.js";
import milvus from "./milvus.js";
import data from "./test-data.js";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors({ origin: "http://localhost:3000" }), express.json());

app.listen(8080, () => {
  console.log("http://localhost:8080 에서 서버 실행중");
});

app.get("/", (req, res) => {
  res.send("서버 접속 완료");
});

app.post("/lyric", async (req, res) => {
  const keyword = req.body.keyword;
  const result = await lyricManager.lyricSearch(keyword);
  res.send(result);
});

app.get("/lyric/:id", async (req, res) => {
  const result = await lyricManager.getLyric(req.params.id);
  res.send(result);
});

//--------------------------------------------------------------------------------

// 최초 실행시 collection 생성. 나중에 삭제
app.get("/createCollection", (req, res) => {
  console.log("createCollection ---- START");
  milvus.createCollection();
  console.log("createCollection ---- END");
});

// 테스트 파일 업로드용. 나중에 삭제
app.get("/testUpload", (req, res) => {
  console.log("lyricInsert ---- START");
  data.forEach((e) => {
    lyricManager.lyricInsert(e);
  });
  console.log("lyricInsert ---- END");
});
