import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CursoService } from '../../service/curso.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Curso {
  id: any;
  titulo: string;
  descripcion: string;
  categoria: string;
  icono: string;
  color: string;
  lecciones: number;
  fecha: string;
  colorBadge: string;
  colorTextoBadge: string;
}

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
  ],

  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
})
export class CursosComponent {
  lecciones = [
    {
      idleccion: 1,
      titulo: 'Leccion I : Introduccion del curso',
      tipoContenido: 'Leccion',
      fecha: 'Publicado 15 octubre.',
      descripcion:
        'En esta sección encontrará el documento PDF, video correspondiente a la introducción del curso.',
      documentos: [
        {
          nombre: 'Guía del participante.pdf',
          tipo: 'PDF',
          url: '/documentos/guia-participante.pdf',
        },
      ],
    },
  ];

  coloresFondo: string[] = [
    '#F39C12', // Naranja
    '#2ECC71', // Verde
    '#3498DB', // Azul
    '#9B59B6', // Morado
    '#E74C3C', // Rojo
    '#1ABC9C', // Turquesa
    '#34495E', // Gris oscuro
    '#E67E22', // Naranja oscuro
    '#F39C12', // Naranja
    '#2ECC71', // Verde
    '#3498DB', // Azul
    '#9B59B6', // Morado
    '#E74C3C', // Rojo
    '#1ABC9C', // Turquesa
    '#34495E', // Gris oscuro
    '#E67E22', // Naranja oscuro
  ];
  cursos: Curso[] = [];
  /*
  cursos: Curso[] = [
    {
      titulo:
        'ADMINISTRACIÓN ESTRATÉGICA PARA LA TOMA DE DECISIONES EN ENTIDADES COOPERATIVAS',
      descripcion:
        'Fortalece tus conocimientos en gestión estratégica para mejorar la toma de decisiones.',
      categoria: 'Administración',
      icono: 'bi bi-book',
      color: '#18b5e8',
      lecciones: 4,
      fecha: '12 Mayo 2024',

      colorBadge: '#d9f6e5',
      colorTextoBadge: '#218c3d',
    },
    {
      titulo: 'EDUCACIÓN FINANCIERA PARA SOCIOS',
      descripcion:
        'Aprende conceptos financieros básicos para una mejor administración.',
      categoria: 'Finanzas',
      icono: 'bi bi-bar-chart',
      color: '#51b848',
      lecciones: 6,
      fecha: '08 Mayo 2024',

      colorBadge: '#E7F7DA',
      colorTextoBadge: '#4CAF50',
    },
    {
      titulo: 'GOBERNANZA Y BUENAS PRÁCTICAS',
      descripcion:
        'Conoce los principios de una adecuada gobernanza cooperativa.',
      categoria: 'Gobernanza',
      icono: 'bi bi-people',
      color: '#6c5ce7',
      lecciones: 5,
      fecha: '01 Mayo 2024',

      colorBadge: '#EFE7FF',
      colorTextoBadge: '#6C5CE7',
    },
    {
      titulo: 'PREVENCIÓN DE LAVADO DE ACTIVOS',
      descripcion:
        'Aprende las obligaciones normativas y los controles internos.',
      categoria: 'Cumplimiento',
      icono: 'bi bi-shield-check',
      color: '#f39c12',
      lecciones: 7,
      fecha: '25 Abril 2024',

      colorBadge: '#FFF2D8',
      colorTextoBadge: '#F39C12',
    },
  ];
  */

  paginaActual = 1;

  registrosPorPagina = 3;

  totalCursos = this.cursos.length;

  mostrar1 = true;
  mostrar2 = false;
  nombreCurso = '';

  totalPaginas = Math.ceil(this.totalCursos / this.registrosPorPagina);
  form!: FormGroup;
  videoModal = false;
  videoUrl!: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private cursoService: CursoService,
  ) {
    this.form = this.fb.group({
      buscar: [''],
      buscarMenu: [],
    });

    this.cursoService.listarCursos().subscribe((data) => {
      data.forEach((item) => {
        const curso: Curso = {
          id: item.id,
          titulo: item.titulo,
          descripcion: item.descripcion,
          categoria: item.categoria,
          icono: 'bi bi-book', //item.icono,
          color: this.obtenerColorAleatorio(), //item.color,
          lecciones: item.lecciones,

          fecha: item.fecha,
          colorBadge: item.colorBadge,
          colorTextoBadge: item.colorTextoBadge,
        };

        this.cursos.push(curso);
      });
      console.log(this.cursos);
      this.totalCursos = this.cursos.length;
    });
  }

  mostrar_pdf() {
    const vari = 'Bases-para-Concurso-Plaza-GG.pdf';
    window.open(`/archivo/${vari}`, '_blank');
  }

  abrirVideo(link: string) {
    const idVideo = this.obtenerIdVideo(link);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${idVideo}?autoplay=1`,
    );

    this.videoModal = true;
  }

  cerrarVideo() {
    this.videoModal = false;
    this.videoUrl = '';
  }

  obtenerIdVideo(url: string): string | null {
    try {
      const ruta = new URL(url);
      const host = ruta.hostname.replace(/^www\./, '');

      if (host === 'youtu.be') {
        return ruta.pathname.split('/').filter(Boolean)[0] || null;
      }

      if (
        host === 'youtube.com' ||
        host === 'm.youtube.com' ||
        host === 'youtube-nocookie.com'
      ) {
        if (ruta.pathname === '/watch') {
          return ruta.searchParams.get('v');
        }

        const coincidencia = ruta.pathname.match(
          /^\/(?:embed|shorts|live)\/([^/?]+)/,
        );

        return coincidencia ? coincidencia[1] : null;
      }

      return null;
    } catch {
      return null;
    }
  }

  leccionExpandida: number | null = null;

  toggleLeccion(idleccion: number): void {
    this.leccionExpandida =
      this.leccionExpandida === idleccion ? null : idleccion;
  }

  verLeccion(idleccion: number): void {
    console.log('Lección seleccionada:', idleccion);
  }

  abrirDocumento(url: string): void {
    window.open(url, '_blank');
  }

  seleccionarCurso(curso: any): void {
    this.mostrar1 = false;
    this.mostrar2 = true;
    console.log('ID del curso seleccionado:', curso);
    this.nombreCurso = curso.titulo;
  }

  obtenerColorAleatorio(): string {
    const indice = Math.floor(Math.random() * this.coloresFondo.length);
    return this.coloresFondo[indice];
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get inicio(): number {
    return (this.paginaActual - 1) * this.registrosPorPagina + 1;
  }

  get fin(): number {
    return Math.min(
      this.paginaActual * this.registrosPorPagina,
      this.totalCursos,
    );
  }

  get cursosPaginados() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;

    return this.cursos.slice(inicio, inicio + this.registrosPorPagina);
  }

  irPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  paginaAnterior() {
    if (this.paginaActual > 1) this.paginaActual--;
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) this.paginaActual++;
  }
}
