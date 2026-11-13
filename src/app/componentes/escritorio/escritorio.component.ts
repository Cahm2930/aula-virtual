import { Component, computed, effect, inject, signal } from '@angular/core';
import { NgClass, NgIf, NgFor, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

const items = [
  {
    nombre: 'Comite de educación',
    icono: 'bi bi-mortarboard',
    children: [
      {
        nombre: 'Videos',
        ruta: '/videos',
      },
      {
        nombre: 'Cursos',
        ruta: 'cursos',
      },
    ],
  },
];
export type MenuItem = {
  icon: string;
  label: string;
  route?: string | string[];
  subItems?: MenuItem[];
};

@Component({
  selector: 'app-escritorio',
  standalone: true,
  imports: [
    MatSelectModule,
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
  templateUrl: './escritorio.component.html',
  styleUrl: './escritorio.component.scss',
})
export class EscritorioComponent {
  a: any;
  private _menuItems = signal<MenuItem[]>([]);
  public readonly menuItems = this._menuItems.asReadonly();
  collapsed = signal(false);

  sidenavWidth = computed(() => (this.collapsed() ? '70px' : '290px'));

  lineaWidth2 = computed(() => (this.collapsed() ? '40px' : '210px'));
  logoImage = computed(() =>
    this.collapsed() ? 'logo_leon.png' : 'logo_leon.png',
  );
  logoWidth = computed(() => (this.collapsed() ? '55px' : '100px'));
  altoDescontado = computed(() => (this.collapsed() ? '142px' : '152px'));
  altoDescontadoReal = signal('152px');
  erp = signal(false);
  openedSubMenus = signal<Set<string>>(new Set());
  form!: FormGroup;
  tipoCambio: any;
  data: any;
  user = 'Usuario';
  correo = 'carlitos29_30@hotmail.com';
  TypeRoles: any;
  changeRole: any;

  private breakpointObserver = inject(BreakpointObserver);
  isMobile = signal(false);
  mobileMenuOpen = signal(false);

  getAlturaCalculada(): string {
    return `calc(100% - ${this.altoDescontado()})`;
  }

  toggleSubMenu(item: MenuItem, parentPath: string[] = []) {
    const key = [...parentPath, item.label].join('/');
    this.openedSubMenus.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }

  isSubMenuOpen(item: MenuItem, parentPath: string[] = []): boolean {
    const key = [...parentPath, item.label].join('/');
    return this.openedSubMenus().has(key);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      roles: [''],
      buscarMenu: [],
    });

    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((result) => {
        this.isMobile.set(result.matches);

        if (result.matches) {
          this.mobileMenuOpen.set(false);
        }
      });

    this.cargarMenu();
    this.router.navigate(['dashboard']);
  }

  alternarMenu(): void {
    if (this.isMobile()) {
      this.mobileMenuOpen.set(!this.mobileMenuOpen());
    } else {
      this.collapsed.set(!this.collapsed());
    }
  }

  cerrarMenuMovil(): void {
    if (this.isMobile()) {
      this.mobileMenuOpen.set(false);
    }
  }

  salir_sesion() {
    this.router.navigate(['']);
  }

  cargarMenu() {
    const items: MenuItem[] = [
      {
        icon: 'bi bi-mortarboard',
        label: 'Comité de Educación',
        subItems: [
          {
            icon: 'bi bi-camera-video',
            label: 'Capacitaciones',
            route: '/videos',
          },
          {
            icon: 'bi bi-book',
            label: 'Cursos',
            route: 'cursos',
          },
          {
            icon: 'bi bi-award',
            label: 'Diplomados',
            route: '/diplomados',
          },
          {
            icon: 'bi bi-mic',
            label: 'Conferencias',
            route: '/conferencias',
          },
        ],
      },
    ];

    this._menuItems.set(items);
  }

  getRoutes(items: any[]): string[] {
    let routes: string[] = [];
    for (const item of items) {
      if (item.route && item.route.trim() !== '') {
        routes.push(item.route);
      }
      if (item.subItems && item.subItems.length) {
        routes = routes.concat(this.getRoutes(item.subItems));
      }
    }
    return routes;
  }
}
