import { getAllObjectsAndSumPrices } from "./motivating-example.ts";

const main = async () => {
  const ids = Array.from({ length: 20 }, (_, i) => i.toString());

  const result = await getAllObjectsAndSumPrices(ids);

  console.log(result);
};

main();
