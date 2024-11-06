import { Editor } from "./editor";

export interface License {
    id?: any;
    nom: string;
    editeur_id?: Editor["id"];
}
