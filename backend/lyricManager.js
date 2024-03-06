import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import milvus from "./milvus.js";
import env from "dotenv";
env.config();

const model = new HuggingFaceTransformersEmbeddings({
  modelName: process.env.MODEL,
});

async function lyricSearch(keyword) {
  const embedKeyword = await model.embedQuery(keyword);
  const result = await milvus.lyricSearch(embedKeyword);
  return result;
}

async function getLyric(lyricId) {
  const result = await milvus.getLyric(lyricId);
  return result;
}

async function lyricInsert(data) {
  const lyricsData = data.lyrics;
  const lyricsOneLine = lyricOptimizer(lyricsData, data.language);
  const embedLyrics = await model.embedQuery(lyricsOneLine);
  const summary = "나중에 구현";

  data.summary = summary;
  data.youtubeId = data.link_youtube.split("watch?v=")[1];

  const result = await milvus.lyricInsert(data, embedLyrics);
  return result;
}

function lyricOptimizer(lyricsData, language) {
  const regexRemoveBracket = /\([^)]{0,30}\)|\{[^}]{0,30}\}|\[[^\]]{0,30}\]/g; // 괄호 내의 30자인 패턴을 제거
  const regexSingleSpace = /\s{2,}/g; // 공백 2칸 이상이면 1개로 변경

  const lyricSet = new Set();
  const lyricsParts = Object.values(lyricsData);
  for (const part of lyricsParts) {
    const lyricsLines = Object.values(part["lines"]);

    for (const line of lyricsLines) {
      const lyric = line[language]
        .replace(regexRemoveBracket, "")
        .replace(regexSingleSpace, " ")
        .trim();
      if (lyric.length > 0) {
        lyricSet.add(lyric);
      }
    }
  }

  let result = "";
  for (const lyric of lyricSet) {
    result += lyric + " ";
  }

  return result.trim();
}

export default { lyricSearch, lyricInsert, getLyric };
