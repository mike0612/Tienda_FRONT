import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule { }
