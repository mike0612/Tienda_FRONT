import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { ArticulosComponent } from './articulos/articulos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { TiendaComponent } from './tienda/tienda.component';
import { PagesComponent } from './pages.component';
import { authGuard } from '../guards/auth.guard';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate:[authGuard],
    component: PagesComponent,
    children: [
      { path: '', component: ArticulosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'tienda', component: TiendaComponent },
      { path: 'carrito', component: CarritoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
