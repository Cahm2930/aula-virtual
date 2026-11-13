import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-item-capacitacion',
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
  templateUrl: './item-capacitacion.component.html',
  styleUrl: './item-capacitacion.component.scss',
})
export class ItemCapacitacionComponent {
  private fb = inject(FormBuilder);
  readonly String = String;
  filahov: number = -1;

  private dialogRef = inject(MatDialogRef<ItemCapacitacionComponent>);

  formulario: FormGroup = this.fb.group({
    pregunta: ['', [Validators.required, Validators.minLength(5)]],
    alternativas: this.fb.array([]),
    respuestaCorrecta: [null, Validators.required],
    documentos: this.fb.array([]),
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
    const correcta = this.formulario.get('respuestaCorrecta')?.value;

    this.alternativas.removeAt(index);

    if (correcta === index) {
      this.formulario.get('respuestaCorrecta')?.setValue(null);
    } else if (correcta !== null && correcta > index) {
      this.formulario.get('respuestaCorrecta')?.setValue(correcta - 1);
    }
  }

  guardarPregunta(): void {
    /* if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
      */

    const datos = this.formulario.getRawValue();

    /*  const leccion: LeccionDTO = {
        titulo: this.formLeccion.value.titulo,
        descripcion: this.formLeccion.value.descripcion,
        tipoContenido: 'MULTIMEDIA',
        orden: this.listaLecciones.length + 1,
        esObligatoria: true
      };
   */

    this.dialogRef.close({
      pregunta: datos.pregunta.trim(),

      alternativas: datos.alternativas.map((texto: string, index: number) => ({
        texto: texto.trim(),
      })),

      documentos: datos.documentos.map((documento: any) => ({
        archivo: documento.archivo,
        nombre: documento.archivo?.name,
      })),
    });
  }

  crearDocumento(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      archivo: [null, [Validators.required, this.validarArchivoPdf]],
    });
  }

  get documentos(): FormArray {
    return this.formulario.get('documentos') as FormArray;
  }

  agregarDocumento(): void {
    if (this.documentos.length >= 10) {
      return;
    }

    this.documentos.push(this.crearDocumento());
  }

  eliminarDocumento(index: number): void {
    this.documentos.removeAt(index);
  }

  seleccionarDocumento(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0] ?? null;

    const control = this.documentos.at(index).get('archivo');

    if (!control) {
      return;
    }

    control.setValue(archivo);
    control.markAsTouched();
    control.updateValueAndValidity();

    // Permite volver a seleccionar el mismo archivo.
    input.value = '';
  }

  validarArchivoPdf(control: AbstractControl) {
    const archivo = control.value as File | null;

    if (!archivo) {
      return null;
    }

    const esPdf =
      archivo.type === 'application/pdf' ||
      archivo.name.toLowerCase().endsWith('.pdf');

    if (!esPdf) {
      return { tipoInvalido: true };
    }

    const maximoBytes = 20 * 1024 * 1024;

    if (archivo.size > maximoBytes) {
      return { tamanoInvalido: true };
    }

    return null;
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
