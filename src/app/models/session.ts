export interface Session {
    id?: number;
    date_debut: string;
    date_fin: string;
    valeur_commission: number;
    commission_en_pourcentage: boolean;
    valeur_frais_depot: number;
    frais_depot_en_pourcentage: boolean;
  }
  