import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Manager } from 'src/app/models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private endpoint = 'gestionnaires';

  constructor(
    private apiService: ApiService
  ) { }

  createManager(manager: Manager): Observable<Manager> {
    return this.apiService.post<Manager>(`${this.endpoint}/register`, manager, {withCredentials: true});
  }

}
