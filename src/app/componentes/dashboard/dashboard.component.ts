import { Component } from '@angular/core';
import { FuncionesService } from '../../service/funciones.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  fechaActual: any;
  constructor(private fechaService: FuncionesService) {
    this.fechaActual = this.fechaService.obtenerFechaFormateada();
  }
}
