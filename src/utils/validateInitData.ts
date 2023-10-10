import CryptoJS from "crypto-js";

export default async function validateInitData(initData: URLSearchParams, botToken: string): Promise<boolean> {
  const hash = initData.get("hash");
  let dataToCheck: string[] = [];
  
  initData.sort();
  initData.forEach((val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`));
  let dataCheckString = dataToCheck.join("\n");
  const secret = CryptoJS.HmacSHA256(botToken, "WebAppData");
  const _hash = CryptoJS.HmacSHA256(dataCheckString, secret).toString(CryptoJS.enc.Hex);
  
  return _hash === hash;
}
