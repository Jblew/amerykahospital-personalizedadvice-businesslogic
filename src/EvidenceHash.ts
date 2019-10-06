import { browserPbkdf2 } from "./util/browserPbkdf2";

export namespace EvidenceHash {
    const iterations = 70 * 1000;
    const length = 128;

    export async function generate(params: { evidenceId: string; salt: string }) {
        const buf = await browserPbkdf2(params.evidenceId, params.salt, iterations, length);
        return buf.toString("base64");
    }
}
