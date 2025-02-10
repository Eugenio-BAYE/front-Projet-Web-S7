import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private endpoint = 'gestion';

  constructor(private apiService: ApiService) {}

  getBilan(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/bilan`);
  }
}
