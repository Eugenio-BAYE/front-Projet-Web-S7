import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Seller } from 'src/app/models/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private endpoint = 'vendeurs';

  constructor(private apiService: ApiService) {
  }

  createSeller(seller: Seller): Observable<Seller> {
    return this.apiService.post<Seller>(`${this.endpoint}/register`, seller, {withCredentials: true});
  }

  getSellerByEmail(email: string): Observable<Seller> {
    return this.apiService.get<Seller>(`${this.endpoint}?email=${email}`); // TODO: Change ?email to= /
  }

  getSellerStock(idSession: string, idVendeur: string, numPage?: number): Observable<any> {
    const url = numPage
      ? `${this.endpoint}/stock/${idSession}/${idVendeur}?numpage=${numPage}`
      : `${this.endpoint}/stock/${idSession}/${idVendeur}`;
    return this.apiService.get<any>(url);
  }

  getAmountDue(idSession: string, idVendeur: string): Observable<number> {
    return this.apiService.get<number>(`${this.endpoint}/sommedue/${idSession}/${idVendeur}`);
  }

  resetAmountDue(idSession: string, idVendeur: string): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/sommedue/${idSession}/${idVendeur}`, {});
  }

  getTotalEarned(idSession: string, idVendeur: string): Observable<number> {
    return this.apiService.get<number>(`${this.endpoint}/argentgagne/${idSession}/${idVendeur}`);
  }

  getSellerStats(idVendeur: string): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/stats/${idVendeur}`);
  }
}
