import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Editor } from 'src/app/models/editor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private endpoint = 'editeurs';

  constructor(
    private apiService: ApiService
  ) { }

  createEditor(editor: Editor): Observable<Editor> {
    return this.apiService.post<Editor>(`${this.endpoint}/`, editor, {withCredentials: true});
  }

  getEditors(): Observable<Editor[]> {
    return this.apiService.get<Editor[]>(`${this.endpoint}/`);
  }
}
