import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CursoService } from '../../service/curso.service';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CapacitacionService } from '../../service/capacitacion.service';

@Component({
  selector: 'app-mantenedor',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatPaginatorModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    ReactiveFormsModule,
    MatListModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    NgIf,
    NgFor,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
  ],
  templateUrl: './mantenedor.component.html',
  styleUrl: './mantenedor.component.scss',
})
export class MantenedorComponent {
  filahov: number = -1;
  form!: FormGroup;
  listaEstados: any;
  dato: any;
  cargando!: true;
  dataSource: any;
  listarRequerimiento: any;
  ordenar: any;
  historial: any;
  conformidad: any;
  HighlightRow!: Number;
  tabla1 = true;
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  listarCursos: any;
  listarCapacitaciones: any;
  mostrarCapacitacion: boolean = true;
  mostrarCurso: boolean = false;
  displayedcolumnsCapacitacion = ['col1', 'col2', 'col3', 'col4', 'col5'];

  displayedcolumns = [
    'col1',
    'col2',
    'col3',
    'col4',
    'col5',
    'col6',
    'col7',
    'col8',
  ];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private cursoService: CursoService,
    private capacitacionService: CapacitacionService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      buscar: [''],
      tipo: [''],
    });

    this.cursoService.listarCursos().subscribe((data) => {
      this.listarCursos = data;
      console.log(data);
    });

    this.capacitacionService.listarCapacitaciones().subscribe((data) => {
      this.listarCapacitaciones = data;
      console.log(data);
    });
  }

  cambiarPestana(event: any): void {
    if (event.index === 0) {
      this.mostrarCapacitacion = true;
      this.mostrarCurso = false;
    } else if (event.index === 1) {
      this.mostrarCapacitacion = false;
      this.mostrarCurso = true;
    }
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    // this.listarRequerimientos();
  }

  highlightRow(i: any) {
    this.filahov = i;
    this.cdr.detectChanges();
  }

  comparer(o1: any, o2: any): boolean {
    if (o1.descripcion == o2.descripcion) return true;
    else return false;
  }

  mantenedor(lement?: any) {
    //  this.router.navigate(['detalle']);
    this.router.navigate(['escritorio', 'detalle']);
  }

  mantenedorCapacitacion(lement?: any) {
    this.router.navigate(['escritorio', 'detalle-capacitacion'], {
      state: {
        capacitacion: lement,
        modo: 'CREAR',
      },
    });
  }

  verDetalle(lement?: any) {}
  cotizaciones(e?: any) {}

  fueratabla() {
    this.filahov = -1;
  }
}
