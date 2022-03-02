const nftDotStorage = async (img) => {
  console.log("CALLED  NFT STORAGE");
  console.log("API KEY", process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY);
  console.log("IMG", img);
  try {
    const res = await fetch("https://api.nft.storage/upload", {
      body: img,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const data = await res.json();
    console.log("RES", data);
    const contentId = data.value.cid;
    console.log("Content ID", contentId);
    return contentId;
  } catch (err) {
    console.log(err, "BIG ERRROR");
    return;
  }
};

module.exports = {
  nftDotStorage,
};
