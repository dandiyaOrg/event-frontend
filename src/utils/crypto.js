// utils/crypto.js
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_PASSWORD_ENCRYPTION_KEY; // must match backend
const salt = "salt"; // same as backend

// Derive key (approximate scryptSync using PBKDF2 in frontend)
function deriveKey(password) {
  return CryptoJS.PBKDF2(password, CryptoJS.enc.Utf8.parse(salt), {
    keySize: 256 / 32,
    iterations: 1000,
  });
}

export const decryptPassword = (encrypted) => {
    
  if (!encrypted) return null;

  try {
    const [ivHex, encryptedText] = encrypted.split(":");
    if (!ivHex || !encryptedText) return null;

    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const key = deriveKey(secretKey);

    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error("Decryption failed:", err);
    return null;
  }
};
