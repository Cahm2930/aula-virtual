import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CapacitacionService {
  private http = inject(HttpClient);
  private url = `${environment.baseUrl}api/capacitaciones`;

  constructor() {}

  guardar(formData: FormData): Observable<any> {
    return this.http.post<any>(this.url, formData);
  }

  listarCapacitaciones() {
    return this.http.get<any[]>(`${this.url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  listarLeccionesCapacitaciones(id: any) {
    return this.http.get<any[]>(`${this.url}/capacitacion/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
