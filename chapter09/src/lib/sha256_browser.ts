// 웹 브라우저에서 사용되는 함수
async function sha256_browser(data: string): Promise<string> {
  // utf-8 형식으로 문자열을 인코딩 한다.
  const msgUint8Array = new TextEncoder().encode(data);

  // 데이터를 해싱한다.
  const hashByteArray = await crypto.subtle.digest("SHA-256", msgUint8Array);

  // ArrayBuffer -> Array로 변환
  const hashArray = Array.from(new Uint8Array(hashByteArray));

  // byte에서 16진수 문자열로 변환함.
  const hashHex = hashArray
    .map((b) => ("00" + b.toString(16)).slice(-2))
    .join("");

  return Promise.resolve(hashHex);
}

export default sha256_browser;
