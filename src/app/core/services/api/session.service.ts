import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Session } from 'src/app/models/session';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private endpoint = 'sessions';

  constructor(
    private apiService: ApiService
  ) {}

  createSession(session: Session): Observable<Session> {
    return this.apiService.post<Session>(`${this.endpoint}`, session, { withCredentials: true });
  }

  getAllSessions(): Observable<Session[]> {
    return this.apiService.get<Session[]>(`${this.endpoint}/`);
  }
  
}