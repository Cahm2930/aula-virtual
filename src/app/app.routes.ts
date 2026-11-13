import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { EscritorioComponent } from './componentes/escritorio/escritorio.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { MantenedorComponent } from './componentes/mantenedor/mantenedor.component';
import { DetalleCursoComponent } from './componentes/detalle-curso/detalle-curso.component';
import { CapacitacionesComponent } from './componentes/capacitaciones/capacitaciones.component';
import { DetalleCapacitacionComponent } from './componentes/detalle-capacitacion/detalle-capacitacion.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'escritorio',
    component: EscritorioComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cursos', component: CursosComponent },
      { path: 'mantenedor', component: MantenedorComponent },
      { path: 'detalle', component: DetalleCursoComponent },
      { path: 'detalle-capacitacion', component: DetalleCapacitacionComponent },

      { path: 'capacitaciones', component: CapacitacionesComponent },
    ],
  },
];
