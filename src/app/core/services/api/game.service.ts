import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { License } from 'src/app/models/license';
import { ApiService } from '../api.service';
import { Game } from 'src/app/models/game';
import { Seller } from 'src/app/models/seller';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  private endpoint = "jeux"

  constructor(
    private apiService: ApiService
  ) { }

  deposerJeu(games: Game[], quantity: number[], code_promo : string | null, seller : Seller): Observable<Game> {
    const payload = {
      quantite: quantity, // Quantité de jeux
      licence: games.map(game => game.licence_id), // Récupère les IDs de licence
      prix: games.map(game => game.prix), // Récupère les prix
      code_promo: code_promo || null, // Peut être null ou une chaîne
      id_vendeur: seller.id, // ID du vendeur
    };

    console.log(payload);
    return this.apiService.post<Game>(`${this.endpoint}/deposer`, payload, { withCredentials: true });
  }
}
