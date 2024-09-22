export async function generateKeys(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256"
    },
    true,
    ["deriveKey"]
  );
}

export async function exportPublicKey(key: CryptoKey): Promise<Uint8Array> {
  const exported = await crypto.subtle.exportKey("raw", key);
  return new Uint8Array(exported);
}

export async function importPublicKey(
  keyData: Uint8Array // Raw public key data as Uint8Array
): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",                            // Key format
    keyData,                   // Convert Uint8Array to ArrayBuffer
    {name: "ECDH", namedCurve: "P-256"}, // Algorithm and curve used for key
    true,                            // Key is extractable
    []                               // No key usages needed for public key
  );
}


export async function exportPrivateKey(key: CryptoKey): Promise<Uint8Array> {
  if (key.type !== "private") {
    throw new Error("Key is not a private key");
  }

  // Export the private key in PKCS #8 format
  const privateKeyBuffer = await crypto.subtle.exportKey("pkcs8", key);
  return new Uint8Array(privateKeyBuffer);
}


export async function importPrivateKey(keyData: ArrayBuffer): Promise<CryptoKey> {
  // Import the private key from ArrayBuffer in PKCS #8 format
  const privateKey = await crypto.subtle.importKey(
    "pkcs8",                       // Key format
    keyData,                       // ArrayBuffer containing the key data
    {name: "ECDH", namedCurve: "P-256"},                     // Algorithm and curve used for key
    true,                         // Key is extractable
    ["deriveKey", "deriveBits"]   // Key usages
  );

  return privateKey;
}

export async function deriveSharedSecret(
  privateKey: CryptoKey,
  otherPublicKey: CryptoKey
): Promise<CryptoKey> {
  return crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: otherPublicKey
    },
    privateKey,
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptMessage(
  message: string,
  sharedSecret: CryptoKey
): Promise<{ iv: Uint8Array; ciphertext: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const messageBuffer = encoder.encode(message);

  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      sharedSecret,
      messageBuffer
    )
  );

  return {iv, ciphertext};
}

export async function decryptMessage(
  key: CryptoKey,
  iv: Uint8Array,
  ciphertext: Uint8Array
): Promise<string> {
  const decryptedData = new Uint8Array(
    await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      ciphertext
    )
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);  // Convert Uint8Array back to string
}

