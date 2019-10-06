// tslint:disable no-bitwise
/**
 * Source: https://github.com/crypto-browserify/pbkdf2/blob/master/lib/async.js
 *
 * Thank you!
 */
const defaultEncoding = "utf-8";
const hashAlgo = "SHA-512";

export async function browserPbkdf2(passwordStr: string, saltStr: string, iterations: number, length: number) {
    const subtle = window.crypto.subtle;

    const password = Buffer.from(passwordStr, defaultEncoding);
    const salt = Buffer.from(saltStr, defaultEncoding);

    const key = await subtle.importKey("raw", password, { name: "PBKDF2" } as any, false, ["deriveBits"]);

    const res = await subtle.deriveBits(
        {
            name: "PBKDF2",
            salt,
            iterations,
            hash: {
                name: hashAlgo,
            },
        },
        key,
        length << 3,
    );
    return Buffer.from(res);
}
