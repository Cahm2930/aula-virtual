import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FuncionesService {
  obtenerFechaActual(): Date {
    return new Date();
  }

  obtenerFechaFormateada(): string {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
      .format(new Date())
      .replace(' de ', ' ');
  }
}
