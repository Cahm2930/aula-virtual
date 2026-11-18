import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cargando',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './cargando.component.html',
  styleUrl: './cargando.component.scss'
})
export class CargandoComponent {

}
