// iTunes artwork URLs end in "600x600bb.jpg"; swapping that suffix serves
// other sizes and formats from Apple's CDN.
export const ARTWORK_SIZES = "(max-width: 640px) 50vw, 300px";

export const artworkUrl = (url: string, size: number, ext: "jpg" | "webp") =>
  url.replace("600x600bb.jpg", `${size}x${size}bb.${ext}`);

export const artworkSrcset = (url: string, ext: "jpg" | "webp") =>
  [300, 600].map((size) => `${artworkUrl(url, size, ext)} ${size}w`).join(", ");
