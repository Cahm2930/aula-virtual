import { Component } from '@angular/core';
import { FuncionesService } from '../../service/funciones.service';

@Component({
  selector: 'app-invitado',
  standalone: true,
  imports: [],
  templateUrl: './invitado.component.html',
  styleUrl: './invitado.component.scss',
})
export class InvitadoComponent {
  fechaActual: any;

  constructor(private fechaService: FuncionesService) {
    this.fechaActual = this.fechaService.obtenerFechaFormateada();
  }
}
