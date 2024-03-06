import {
  MilvusClient,
  DataType,
  MetricType,
  ConsistencyLevelEnum,
} from "@zilliz/milvus2-sdk-node";
import env from "dotenv";
env.config();

const collectionName = process.env.MILVUS_COLLECTION_NAME;

// connect to milvus
const address = `${process.env.MILVUS_HOST}:${process.env.MILVUS_PORT}`;
const token = `${process.env.MILVUS_USERNAME}:${process.env.MILVUS_PASSWORD}`;
const ssl = false;
const milvusClient = new MilvusClient({
  address,
  ssl,
  token,
});

// create collection if not exist
async function createCollection() {
  const collectionCheck = await milvusClient.hasCollection({
    collection_name: collectionName,
  });

  if (!collectionCheck.value) {
    const vectorField1 = "lyrics_vector";
    const params = {
      collection_name: collectionName,
      description: "lyric data",
      fields: [
        {
          name: "id",
          data_type: DataType.Int64,
          is_primary_key: true,
          autoID: true,
          description: "",
        },
        {
          name: "title",
          data_type: DataType.VarChar,
          max_length: 512,
          description: "title",
        },
        {
          name: "title_en",
          data_type: DataType.VarChar,
          max_length: 512,
          description: "title_en",
        },
        {
          name: "artist",
          data_type: DataType.VarChar,
          max_length: 512,
          description: "artist",
        },
        {
          name: "artist_en",
          data_type: DataType.VarChar,
          max_length: 512,
          description: "artist_en",
        },
        {
          name: "year",
          data_type: DataType.VarChar,
          max_length: 4,
          description: "year",
        },
        {
          name: "country",
          data_type: DataType.VarChar,
          max_length: 3,
          description: "country",
        },
        {
          name: "language",
          data_type: DataType.VarChar,
          max_length: 256,
          description: "language",
        },
        {
          name: "cover",
          data_type: DataType.VarChar,
          max_length: 512,
          description: "cover",
        },
        {
          name: "youtubeId",
          data_type: DataType.VarChar,
          max_length: 512,
          description: "youtubeId",
        },
        {
          name: "summary",
          data_type: DataType.VarChar,
          max_length: 5000,
          description: "summary",
        },
        {
          name: "lyrics",
          data_type: DataType.JSON,
          description: "lyrics",
        },
        {
          name: vectorField1,
          description: vectorField1,
          data_type: DataType.FloatVector,
          dim: process.env.DIMENSION,
        },
      ],
      enableDynamicField: true,
    };

    await milvusClient.createCollection(params);
    await milvusClient.createIndex({
      collection_name: collectionName,
      field_name: vectorField1,
      index_name: "vector_index",
      index_type: "IVF_FLAT",
      params: { nlist: 1536 }, // 아직 정확하게 잘 모름
      metric_type: "L2",
    });
    // vector 필드의 index 생성 후 load 필수
    await milvusClient.loadCollectionSync({
      collection_name: collectionName,
    });
  }
}

async function lyricSearch(embedKeyword) {
  await milvusClient.loadCollection({
    collection_name: collectionName,
  });

  const searchParams = {
    params: { nprobe: 1024 }, // 아직 정확하게 잘 모름
  };

  const result = await milvusClient.search({
    collection_name: collectionName,
    vector: embedKeyword,
    filter: null,
    // the sum of 'limit' and 'offset' should be less than 16384.
    limit: 10,
    offset: 0,
    metric_type: MetricType.L2,
    param: searchParams,
    consistency_level: ConsistencyLevelEnum.Strong,
  });

  return result;
}

async function getLyric(lyricId) {
  await milvusClient.loadCollection({
    collection_name: collectionName,
  });

  const result = await milvusClient.query({
    collection_name: collectionName,
    expr: `id == ${lyricId}`,
    output_fields: [
      "id",
      "title",
      "title_en",
      "artist",
      "artist_en",
      "year",
      "country",
      "language",
      "cover",
      "youtubeId",
      "summary",
      "lyrics",
    ],
  });

  return result;
}

async function lyricInsert(data, embedLyrics) {
  const fieldsData = [
    {
      title: data.title,
      title_en: data.title_en,
      artist: data.artist,
      artist_en: data.artist_en,
      year: data.year,
      country: data.country,
      language: data.language,
      cover: data.cover,
      youtubeId: data.youtubeId,
      summary: data.summary,
      lyrics: data.lyrics,
      lyrics_vector: embedLyrics,
    },
  ];

  const result = await milvusClient.insert({
    collection_name: collectionName,
    fields_data: fieldsData,
  });

  return result;
}

export default { createCollection, lyricSearch, lyricInsert, getLyric };
