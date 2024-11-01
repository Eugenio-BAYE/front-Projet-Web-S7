import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Seller } from 'src/app/models/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private endpoint = 'utilisateurs';

  constructor(private apiService: ApiService) {
  }

  createSeller(seller: Seller): Observable<Seller> {
    return this.apiService.post<Seller>(this.endpoint, seller);
  }
  
}
