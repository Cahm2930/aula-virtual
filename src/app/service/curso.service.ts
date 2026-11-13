import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private http = inject(HttpClient);
  private url = `${environment.baseUrl}api/cursos`;

  constructor() {}

  listarCursos() {
    return this.http.get<any[]>(`${this.url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
