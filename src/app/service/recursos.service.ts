import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecursosService {
  private http = inject(HttpClient);
  private url = `${environment.baseUrl}aula/recursos`;

  constructor() {}

  obtenerPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.url}/${id}/archivo`, {
      responseType: 'blob',
    });
  }
}
