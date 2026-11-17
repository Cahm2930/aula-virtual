import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-movil',
  standalone: true,

  imports: [
    MatButtonModule,
    MatExpansionModule,
    RouterModule,
    CommonModule,
    NgIf,
    MatBadgeModule,
    RouterOutlet,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatMenuModule,
  ],
  templateUrl: './menu-movil.component.html',
  styleUrl: './menu-movil.component.scss',
})
export class MenuMovilComponent {
  a: any;
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<MenuMovilComponent>,
  ) {}

  cerrar() {
    this.dialogRef.close();
  }

  credito_mype() {
    this.router.navigate(['credito-mype']);
    this.dialogRef.close();
  }

  irPrestamos() {}

  inicio() {}

  credito_leon_vehicular_consumo() {
    this.router.navigate(['credito-vehicular-consumo']);
    this.dialogRef.close();
  }

  exoneracionMulta() {
    this.router.navigate(['exoneracion-multa']);
    this.dialogRef.close();
  }
  serSocio() {
    this.router.navigate(['asociate']);
    this.dialogRef.close();
  }

  ayudasepelio() {
    this.router.navigate(['ayuda-por-sepelio']);
    this.dialogRef.close();
  }

  servicios_convenio() {
    this.router.navigate(['servicios-convenio']);
    this.dialogRef.close();
  }

  credito_leon_vehicular() {
    this.router.navigate(['credito-leon-vehicular']);
    this.dialogRef.close();
  }

  credito_leon_consumo() {
    this.router.navigate(['credito-leon-consumo']);
    this.dialogRef.close();
  }

  credito_vivienda() {
    this.router.navigate(['credito-leon-vivienda']);
    this.dialogRef.close();
  }

  credito_leon_convenio() {
    this.router.navigate(['credito-convenio']);
    this.dialogRef.close();
  }

  credito_super_efectivo() {
    this.router.navigate(['credito-super-efectivo']);
    this.dialogRef.close();
  }

  credito_leon_garantia_ahorro() {
    this.router.navigate(['credito-leon-garantia_ahorro']);
    this.dialogRef.close();
  }

  credito_leon_capital_trabajo() {
    this.router.navigate(['credito-leon-capital-trabajo']);
    this.dialogRef.close();
  }

  credito_activo_fijo() {
    this.router.navigate(['credito-activo-fijo']);
    this.dialogRef.close();
  }

  credito_hipotecario() {
    this.router.navigate(['credito-hipotecario']);
    this.dialogRef.close();
  }

  ahorro_libre() {
    this.router.navigate(['ahorro-libre']);
    this.dialogRef.close();
  }

  plazo_fijo() {
    this.router.navigate(['plazo-fijo']);
    this.dialogRef.close();
  }

  yape() {
    this.router.navigate(['servicio-yape']);
    this.dialogRef.close();
  }

  campania() {
    this.router.navigate(['campania']);
    this.dialogRef.close();
  }

  comiteElectoral() {
    this.router.navigate(['comite-electoral']);
    this.dialogRef.close();
  }

  promociones() {
    this.router.navigate(['promociones']);
  }

  credito_leon_estudios() {
    this.router.navigate(['credito-leon-estudios']);
  }

  bancaMovil() {
    this.router.navigate(['login-banca']);
  }

  bancaInternet() {
    this.router.navigate(['banca-internet']);
  }

  nosotros() {
    this.router.navigate(['nosotros']);
  }

  transparencia() {
    this.router.navigate(['transparencia']);
  }

  ubicanos() {
    this.router.navigate(['ubicanos']);
  }

  trabaja_nosotros() {
    this.router.navigate(['trabaja-con-nosotros']);
  }

  centroAyuda() {
    this.router.navigate(['centro-ayuda']);
  }

  blog_leon() {
    this.router.navigate(['blog-leon']);
  }

  politicaPrivacidad() {
    this.router.navigate(['politica-privacidad']);
  }

  proteccionDatos() {
    const queryParams = {
      archivo: 'FORMATO-PARA-EJERCICIO-DE-DERECHOS-ARCO.pdf',
    };
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['previsualizador-pdf'], { queryParams }),
    );
    window.open(url, '_blank');
  }
}
