import { MedicalProfessional } from "./MedicalProfessional";
import { PendingMedicalProfessional } from "./PendingMedicalProfessional";

export interface MedicalProfessionalRepository {
    add(pendingMp: PendingMedicalProfessional): Promise<{ id: string }>;
    get(id: string): Promise<MedicalProfessional | undefined>;
    list(): Promise<MedicalProfessional[]>;
}
