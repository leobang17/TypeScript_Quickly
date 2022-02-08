import crypto from "crypto";

function sha256_node(data: string): Promise<string> {
  // SHA-256 해시를 생성함
  return Promise.resolve(
    crypto.createHash("sha256").update(data).digest("hex")
  );
}

export default sha256_node;
