// tslint:disable
import { EvidenceHash } from "./EvidenceHash";

(async () => {
    console.time("calc");
    const out = await EvidenceHash.generate({
        evidenceId: "12548964001",
        salt: "uUwfaubn@DnruDD5DO#pFK6kXU&XHwAutq65X1Mn*^jo5RkrCW&L",
    });
    console.timeEnd("calc");

    console.log(typeof out);
    console.log(out);
})();
