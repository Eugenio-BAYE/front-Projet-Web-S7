import { Injectable } from '@angular/core';
import { License } from 'src/app/models/license';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  private endpoint = "licences"

  constructor(
    private apiService: ApiService
  ) { }

  createLicense(license: License): Observable<License> {
    const payload = {
      nom: license.nom,
      editeur_id: license.editeur_id
    };
    console.log(payload);
    return this.apiService.post<License>(`${this.endpoint}/`, payload, { withCredentials: true });
  }

  getLicenses(): Observable<License[]> {
    return this.apiService.get<License[]>(this.endpoint);
  }

  getLicense(id: number): Observable<License> {
    return this.apiService.get<License>(`${this.endpoint}/${id}`);
  }
}
