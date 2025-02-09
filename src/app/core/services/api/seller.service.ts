import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { map, Observable } from 'rxjs';
import { Seller } from 'src/app/models/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private endpoint = 'vendeurs';

  constructor(private apiService: ApiService) {
  }

  createSeller(seller: Seller): Observable<Seller> {
    return this.apiService.post<Seller>(`${this.endpoint}/register`, seller, { withCredentials: true });
  }

  getSellerByEmail(email: string): Observable<Seller> {
    return this.apiService.get<Seller>(`${this.endpoint}/${email}`);
  }

  getSellerStock(idSession: number, idVendeur: number, numPage?: number): Observable<any> {
    const url = numPage
      ? `${this.endpoint}/stock/${idSession}/${idVendeur}?numpage=${numPage}`
      : `${this.endpoint}/stock/${idSession}/${idVendeur}`;
    return this.apiService.get<any>(url);
  }

  getSoldGames(idSession: number, idVendeur: number, numPage?: number): Observable<any> {
    return this.getSellerStock(idSession, idVendeur, numPage).pipe(
      map((games) => games.filter((game: any) => game.statut === 'vendu'))
    );
  }

  getAmountDue(idSession: number, idVendeur: number): Observable<{ sommedue: number }> {
    return this.apiService.get<{ sommedue: number }>(`${this.endpoint}/sommedue/${idSession}/${idVendeur}`);
  }


  getTotalEarned(idSession: number, idVendeur: number): Observable<{ sommegenerée: number }> {
    return this.apiService.get<{ sommegenerée: number }>(`${this.endpoint}/argentgagne/${idSession}/${idVendeur}`);
  }

  getSellerStats(idVendeur: number): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/stats/${idVendeur}`);
  }

  resetAmountDue(idSession: number, idVendeur: number): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/sommedue/${idSession}/${idVendeur}`, {});
  }

}
