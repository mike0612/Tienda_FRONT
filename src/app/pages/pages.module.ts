import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';


import { ArticulosComponent } from './articulos/articulos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { CarritoComponent } from './carrito/carrito.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';







@NgModule({
  declarations: [
    ArticulosComponent,
    ClientesComponent,
    TiendaComponent,
    PagesComponent,
    CarritoComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PagesModule { }
