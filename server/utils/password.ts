import { scryptAsync } from '@noble/hashes/scrypt.js'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js'

const scryptOptions = {
  N: 16_384,
  r: 16,
  p: 1,
  dkLen: 64,
  maxmem: 128 * 16_384 * 16 * 2
}

async function deriveKey(password: string, salt: string) {
  return scryptAsync(password.normalize('NFKC'), salt, scryptOptions)
}

export async function hashPassword(password: string) {
  const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)))
  return `${salt}:${bytesToHex(await deriveKey(password, salt))}`
}

export async function verifyPassword({ hash, password }: { hash: string, password: string }) {
  const [salt, expectedHex] = hash.split(':')
  if (!salt || !expectedHex) return false

  try {
    const actual = await deriveKey(password, salt)
    const expected = hexToBytes(expectedHex)
    if (actual.length !== expected.length) return false

    let mismatch = 0
    for (let i = 0; i < actual.length; i++) mismatch |= actual[i]! ^ expected[i]!
    return mismatch === 0
  } catch {
    return false
  }
}
