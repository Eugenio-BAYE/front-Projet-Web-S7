import { User } from "./user";

export interface Seller {
    id?: number;
    nom: string;
    email: string;
    telephone: string;
    adresse?: string;
}
