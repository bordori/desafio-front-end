import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ClienteListarComponent} from "./cliente-listar/cliente-listar.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ClienteIncluirEditarComponent} from "./cliente-incluir-editar/cliente-incluir-editar.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'cliente',
    component: ClienteListarComponent
  },
  {
    path: 'cliente/incluir',
    component: ClienteIncluirEditarComponent
  },
  {
    path: 'cliente/:id/alterar',
    component: ClienteIncluirEditarComponent
  }
];
