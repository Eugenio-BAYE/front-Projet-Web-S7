import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodePromo } from 'src/app/models/code-promo';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CodePromoService {

  private endpoint = 'codesPromotion';

  constructor(private apiService: ApiService) {}

  createCodePromo(codePromo: CodePromo): Observable<CodePromo> {
    return this.apiService.post<CodePromo>(this.endpoint, codePromo);
  }

  getAllCodesPromo(): Observable<CodePromo[]> {
    return this.apiService.get<CodePromo[]>(`${this.endpoint}/`);
}

}
