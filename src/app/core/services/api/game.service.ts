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

  getGameById(jeu_id: number): Observable<Game> {
    return this.apiService.get<Game>(`${this.endpoint}/${jeu_id}`);
  }
  
  getSellerRecuperableGames(idVendeur: number, idSession: number): Observable<Game[]> {
    return this.apiService.get<Game[]>(`${this.endpoint}/a_recuperer?vendeur=${idVendeur}&session=${idSession}`);
  }

  recupererJeux(jeux_a_recup: number[]): Observable<any> {
      return this.apiService.post(`${this.endpoint}/recuperer`, { jeux_a_recup });
  }

  searchGames(params: any): Observable<any[]> {
    let queryParams = '';
  
    if (params) {
      queryParams = Object.keys(params)
        .filter(key => params[key] !== '' && params[key] !== null && params[key] !== undefined) // Filtrer les valeurs vides
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    }
  
    const url = queryParams ? `${this.endpoint}/rechercher?${queryParams}` : `${this.endpoint}/rechercher`;
  
    return this.apiService.get<any[]>(url);
  }

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

  jeuxPasEnRayon(): Observable<Game[]> {
    return this.apiService.get<Game[]>(`${this.endpoint}/pas_en_rayon`);
  }

  mettreEnRayon(jeux: Game[]): Observable<Game[]> {
    const payload = {
      jeux_ids: jeux.map(jeu => jeu.id),
      nouveau_statut: "en vente"
    };
  
    return this.apiService.put<Game[]>(`${this.endpoint}/updateStatus`, payload);
  }

  buyGames(jeux_a_acheter: number[], code_promo?: string, acheteur?: number): Observable<any> {
    const payload = {
      jeux_a_acheter,
      code_promo: code_promo || null,
      acheteur: acheteur || null,
    };
    return this.apiService.post(`${this.endpoint}/acheter`, payload);
  }
}
