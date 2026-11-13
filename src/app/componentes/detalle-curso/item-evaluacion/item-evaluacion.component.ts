import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-item-evaluacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
  ],
  templateUrl: './item-evaluacion.component.html',
  styleUrl: './item-evaluacion.component.scss',
})
export class ItemEvaluacionComponent {
  private fb = inject(FormBuilder);
  readonly String = String;

  private dialogRef = inject(MatDialogRef<ItemEvaluacionComponent>);

  formulario: FormGroup = this.fb.group({
    pregunta: ['', [Validators.required, Validators.minLength(5)]],
    alternativas: this.fb.array([
      this.crearAlternativa(),
      this.crearAlternativa(),
    ]),
    respuestaCorrecta: [null, Validators.required],
  });

  crearAlternativa(): FormControl<string> {
    return this.fb.nonNullable.control('', Validators.required);
  }

  get alternativas(): FormArray<FormControl<string>> {
    return this.formulario.get('alternativas') as FormArray<
      FormControl<string>
    >;
  }

  agregarAlternativa(): void {
    if (this.alternativas.length >= 6) {
      return;
    }

    this.alternativas.push(this.crearAlternativa());
  }

  eliminarAlternativa(index: number): void {
    if (this.alternativas.length <= 2) {
      return;
    }

    const correcta = this.formulario.get('respuestaCorrecta')?.value;

    this.alternativas.removeAt(index);

    if (correcta === index) {
      this.formulario.get('respuestaCorrecta')?.setValue(null);
    } else if (correcta !== null && correcta > index) {
      this.formulario.get('respuestaCorrecta')?.setValue(correcta - 1);
    }
  }

  guardarPregunta(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.getRawValue();

    this.dialogRef.close({
      pregunta: datos.pregunta.trim(),
      alternativas: datos.alternativas.map((texto: string, index: number) => ({
        texto: texto.trim(),
        correcta: index === datos.respuestaCorrecta,
      })),
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
