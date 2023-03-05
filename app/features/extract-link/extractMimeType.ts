export async function extractMimeType(url = "") {
  if (!url) return "";
  try {
    let urlObj = new URL(url.toLowerCase());
    if (urlObj.origin.includes("tiktok")) {
      return "";
    }
    let res = await fetch(url, { method: "HEAD" });
    if (res.ok) {
      return res.headers.get("content-type") || "";
    } else {
      console.log("UNABLE TO GET MIME TYPE", res.status, res.statusText);
      return "";
    }
  } catch (err: any) {
    console.log("UNABLE TO GET MIME TYPE, an error occurred", err.message);
    return "";
  }
}
