import { ChangeDetectorRef, Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { ItemEvaluacionComponent } from '../detalle-curso/item-evaluacion/item-evaluacion.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { NgFor, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ItemCapacitacionComponent } from './item-capacitacion/item-capacitacion.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CapacitacionDTO } from '../../model/capacitacionDto';
import { LeccionDTO } from '../../model/LecccionDto';
import { CapacitacionService } from '../../service/capacitacion.service';

export interface Alternativa {
  texto: string;
  correcta?: boolean;
}

export interface DocumentoLeccion {
  archivo: File;
  nombre: string;
}

export interface Leccion {
  id?: number;
  pregunta: string;
  alternativas: Alternativa[];
  documentos: DocumentoLeccion[];
}

@Component({
  selector: 'app-detalle-capacitacion',
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
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './detalle-capacitacion.component.html',
  styleUrl: './detalle-capacitacion.component.scss',
})
export class DetalleCapacitacionComponent {
  displayedcolumnsCapacitacion = ['col1', 'col2', 'col3', 'col4'];
  filahov: number = -1;
  listarCursos: any;
  ordenar: any;
  form!: FormGroup;
  checked = false;
  disabled = false;
  archivoSeleccionado: File | null = null;
  HighlightRow!: Number;
  a: any;
  listaLeccionesAux: Leccion[] = [];
  capacitacionDTO: any | null = null;
  modo: string = '';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private capacitacionService: CapacitacionService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreCurso: [],
      nombreCapacitacion: ['', Validators.required],
      descripcionCapacitacion: ['', Validators.required],
    });

    const datos = history.state;
    this.capacitacionDTO = datos.capacitacion ?? null;
    this.modo = datos.modo ?? '';

    if (this.capacitacionDTO != null) {
      console.log('imprimiendo', this.capacitacionDTO.lecciones);

      this.form
        .get('nombreCapacitacion')
        ?.setValue(this.capacitacionDTO.titulo);
      this.form
        .get('descripcionCapacitacion')
        ?.setValue(this.capacitacionDTO.descripcion);

      this.listaLeccionesAux = this.capacitacionDTO.lecciones.map(
        (item: any): Leccion => {
          return {
            id: item.id,
            pregunta: item.titulo,
            alternativas: item.recursos
              .filter((recurso: any) => recurso.tipoRecurso === 'VIDEO')
              .map((recurso: any) => ({
                texto: recurso.nombreOriginal,
                correcta: false,
                recursoDigitalId: recurso.recursoDigitalId,
              })),

            documentos: item.recursos
              .filter((recurso: any) => recurso.tipoRecurso === 'PDF')
              .map((recurso: any) => ({
                nombre: recurso.nombreOriginal,
                url: recurso.urlDescarga,
                recursoDigitalId: recurso.recursoDigitalId,
              })),
          };
        },
      );
    }
  }

  guardarCapacitacion2() {
    const capacitacionDTO = new CapacitacionDTO();
    capacitacionDTO.descripcion = this.form.value.descripcionCapacitacion;
    capacitacionDTO.titulo = this.form.value.nombreCapacitacion;
  }

  async guardarCapacitacion() {
    console.log('listaLeccionesAux', this.listaLeccionesAux);
    const formData = new FormData();
    // Datos de la capacitación
    const capacitacion = {
      titulo: this.form.value.nombreCapacitacion,
      descripcion: this.form.value.descripcionCapacitacion,

      listaLecciones: this.listaLeccionesAux.map((leccion: any) => ({
        pregunta: leccion.pregunta,

        alternativas: leccion.alternativas.map((alt: any) => ({
          texto: alt.texto,
        })),

        documentos: leccion.documentos.map((doc: any, index: number) => ({
          nombre: doc.nombre,
          archivoKey: `archivo_${this.listaLeccionesAux.indexOf(leccion)}_${index}`,
        })),
      })),
    };

    //Agregar JSON
    formData.append(
      'capacitacion',
      new Blob([JSON.stringify(capacitacion)], {
        type: 'application/json',
      }),
    );

    //Agregar archivos PDF
    this.listaLeccionesAux.forEach((leccion: any, i: number) => {
      leccion.documentos.forEach((doc: any, j: number) => {
        formData.append(`archivo_${i}_${j}`, doc.archivo, doc.nombre);
      });
    });

    const json = formData.get('capacitacion');

    if (json instanceof Blob) {
      json.text().then((contenido) => {
        console.log('JSON CAPACITACIÓN:', JSON.parse(contenido));
      });
    }

    this.capacitacionService.guardar(formData).subscribe({
      next: (respuesta) => {
        console.log('Capacitación guardada:', respuesta);
      },
      error: (error) => {
        console.error('Error al guardar:', error);
      },
    });

    /*

      this.capacitacionService.guardar(formData).subscribe({
        next: (respuesta) => {
          console.log('Capacitación guardada', respuesta);
        },
        error: (error) => {
          console.error(error);
        }
      });

    */
  }

  seleccionarArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
      console.log('Archivo seleccionado:', this.archivoSeleccionado.name);
    }
  }

  nuevaLeccion() {
    const dialogRef = this.dialog.open(ItemCapacitacionComponent, {
      disableClose: true,
      autoFocus: true,
    });
    dialogRef.afterClosed().subscribe((datos) => {
      if (datos) {
        // this.listaLeccionesAux.push(datos);
        this.listaLeccionesAux = [...this.listaLeccionesAux, datos];
        console.log('Datos recibidos del diálogo:', datos);
        console.log('Pregunta:', datos.pregunta);
        console.log('Alternativas:', datos.alternativas);
        console.log('Documentos:', datos.documentos);
        //this.listaLecciones = datos;
        console.log(this.listaLeccionesAux);
        console.log(this.listaLeccionesAux);
      }
    });
  }

  agregarPregunta() {
    const dialogRef = this.dialog.open(ItemCapacitacionComponent, {
      disableClose: true,
      autoFocus: true,
      maxWidth: '800px',
      maxHeight: '200px',
    });
  }

  fueratabla() {
    this.filahov = -1;
  }

  highlightRow(i: any) {
    this.filahov = i;
    this.cdr.detectChanges();
  }
}
