import { License } from "./license";

export interface Game {
    id?: any;
    licence_id: License["id"];
    prix: number;
    statut?: string;
    depot_id: number; // TODO : Change to depot_id
    createdAt?: Date;
    updatedAt?: Date;
}
