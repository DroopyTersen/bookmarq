import probe from "probe-image-size";
export async function extractImageDimensions(imageUrl: string) {
  let result = await probe(imageUrl);
  return result;
}
