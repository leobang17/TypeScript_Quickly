// // SHA - 256 해시 생성을 위해 두 가지 다른 crypto API가 필요하다.
// // 웹 앱의 경우, 모든 브라우저에서 지원하는 crypto API를 사용하면 됨
// // 독립형 앱은 Node.js 런타임에서 실행 가능한 crypto npm 패키지를 사용해야한다.

// // Node.js 런타임에서 사용되는 함수
// function sha256_node(data: string): Promise<string> {
//   // SHA-256 해시를 생성함
//   const crypto = require("crypto");
//   return Promise.resolve(
//     crypto.createHash("sha256").update(data).digest("hex")
//   );
// }

// // 웹 브라우저에서 사용되는 함수
// async function sha256_browser(data: string): Promise<string> {
//   // utf-8 형식으로 문자열을 인코딩 한다.
//   const msgUint8Array = new TextEncoder().encode(data);

//   // 데이터를 해싱한다.
//   const hashByteArray = await crypto.subtle.digest("SHA-256", msgUint8Array);

//   // ArrayBuffer -> Array로 변환
//   const hashArray = Array.from(new Uint8Array(hashByteArray));

//   // byte에서 16진수 문자열로 변환함.
//   const hashHex = hashArray
//     .map((b) => ("00" + b.toString(16)).slice(-2))
//     .join("");

//   return Promise.resolve(hashHex);
// }

import sha256_node from "./sha256_node";
import sha256_browser from "./sha256_browser";

// runtime이 window 전역 변수의 존재를 확인해서 브라우저가 환경인지 node가 환경인지 구분해서 export함.
export const sha256 =
  typeof window === "undefined" ? sha256_node : sha256_browser;
