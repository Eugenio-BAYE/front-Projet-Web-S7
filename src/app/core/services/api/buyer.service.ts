import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Buyer } from 'src/app/models/buyer';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  private endpoint = "acheteurs";

  constructor(
    private apiService: ApiService
  ) { }

  getBuyerByEmail(email: string): Observable<Buyer> {
    return this.apiService.get<Buyer>(`${this.endpoint}/${email}`);
  }

}
