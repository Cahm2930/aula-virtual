import { NgFor, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ItemEvaluacionComponent } from './item-evaluacion/item-evaluacion.component';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [
    MatTableModule,
    NgFor,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,

    MatCheckboxModule,
  ],
  templateUrl: './detalle-curso.component.html',
  styleUrl: './detalle-curso.component.scss',
})
export class DetalleCursoComponent {
  form!: FormGroup;
  checked = false;
  disabled = false;
  archivoSeleccionado: File | null = null;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      nombreCurso: [],
    });
  }

  seleccionarArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];

      console.log('Archivo seleccionado:', this.archivoSeleccionado.name);
    }
  }

  agregarPregunta() {
    const dialogRef = this.dialog.open(ItemEvaluacionComponent, {
      disableClose: true,
      autoFocus: true,

      maxWidth: '800px',
    });
    /*
      .afterClosed()
      .subscribe((result: itemRequerimiento) => {
        if (result) {
        */
  }
}
