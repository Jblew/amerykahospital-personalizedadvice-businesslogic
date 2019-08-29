import { MedicalProfessional } from "./MedicalProfessional";
import { MedicalProfessionalRepository } from "./MedicalProfessionalRepository";
import { PendingMedicalProfessional } from "./PendingMedicalProfessional";

export abstract class AbstractMedicalProfessionalRepository implements MedicalProfessionalRepository {
    public abstract get(id: string): Promise<MedicalProfessional | undefined>;
    public abstract list(): Promise<MedicalProfessional[]>;

    public async add(pendingMp: PendingMedicalProfessional): Promise<MedicalProfessional> {
        PendingMedicalProfessional.validate(pendingMp);
        const mp: MedicalProfessional = {
            id: this.getUuid(),
            ...pendingMp,
        };
        MedicalProfessional.validate(mp);
        await this.writeMedicalProfessional(mp);
        return mp;
    }

    public async update(mp: MedicalProfessional): Promise<void> {
        MedicalProfessional.validate(mp);
        await this.writeMedicalProfessional(mp);
    }

    protected abstract writeMedicalProfessional(mp: MedicalProfessional): Promise<void>;
    protected abstract getUuid(): string;
}
