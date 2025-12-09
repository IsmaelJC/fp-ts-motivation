import axios from "axios";

const CHUNK_SIZE = 6;

const formatQueryString = (ids: string[]) => {
  let queryString = "";

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    queryString += `id=${id}`;

    if (i < ids.length - 1) {
      queryString += "&";
    }
  }

  return queryString;
};

const chunksOf = (array: any[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = [];

    for (let j = 0; j < size; j++) {
      chunk.push(array[i + j]);
    }
    chunks.push(chunk);
  }
  return chunks;
};

const getObjects = async (ids: string[]) => {
  const response = await axios.get(
    `https://api.restful-api.dev/object?${formatQueryString(ids)}`
  );

  return response.data;
};

const getAllObjects = async (ids: string[]) => {
  const chunks = chunksOf(ids, CHUNK_SIZE);

  let promises = [];

  for (const chunk of chunks) {
    promises.push(getObjects(chunk));
  }

  return Promise.all(promises);
};

const sumAllPrices = (objects: any[]) => {
  let prices = 0;

  for (const object of objects) {
    prices += object.data.price;
  }

  return prices;
};

export const getAllObjectsAndSumPrices = async (ids: string[]) => {
  const objects = await getAllObjects(ids);

  return sumAllPrices(objects);
};
