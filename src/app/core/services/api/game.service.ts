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

  createGame(game: Game, quantityInt : number, code_promo : number | null, seller : Seller): Observable<Game> {
    const payload = {
      quantite: quantityInt,
      licence: game.licence_id,
      prix: game.prix,
      code_promo: code_promo,
      id_vendeur: seller.id,
    };

    console.log(payload);
    return this.apiService.post<Game>(`${this.endpoint}/deposer`, payload, { withCredentials: true });
  }
}
