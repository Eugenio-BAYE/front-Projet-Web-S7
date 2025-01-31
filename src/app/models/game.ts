import { License } from "./license";

export interface Game {
    id?: any;
    licence_id: License["id"];
    licence_name?: string;
    prix: number;
    statut?: string;
    depot_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
