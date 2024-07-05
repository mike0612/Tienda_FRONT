import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { authInterceptor } from './shared/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages/pages.routing';
import { RouterLink, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    PagesRoutingModule,
    SharedModule,
    AuthModule,
    PagesModule,
    ReactiveFormsModule


  ],
  exports:[
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
