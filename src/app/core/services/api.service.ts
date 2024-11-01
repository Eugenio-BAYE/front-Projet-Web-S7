import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  get<T>(endpoint: string): Observable<T> {
    const httpOptions = {
      withCredentials: true
    };
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, httpOptions);
  }

  post<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders; params?: HttpParams; responseType?: any , withCredentials? : boolean}): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: options?.responseType || 'text',
      withCredentials: options?.withCredentials || true,
    };
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, httpOptions);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, httpOptions);
  }


  // Test API endpoints :
  sendData(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.apiUrl}/endpoint`, data, httpOptions);
  }




}
