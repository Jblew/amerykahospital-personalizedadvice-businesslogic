import { MedicalProfessional } from "./MedicalProfessional";
import { PendingMedicalProfessional } from "./PendingMedicalProfessional";

export interface MedicalProfessionalRepository {
    add(pendingMp: PendingMedicalProfessional): Promise<MedicalProfessional>;
    update(mp: MedicalProfessional): Promise<void>;
    get(id: string): Promise<MedicalProfessional | undefined>;
    list(): Promise<MedicalProfessional[]>;
}
